//import packages
var inquirer = require("inquirer");
//process.stdout.isTTY = true;  //might need this
var colors = require("colors");
var request = require("request");
var fs = require("fs");

//get data from file
var Word = require("./word.js");
var WordList = require("./wordlist.js");
var Letter = require("./letter.js");
var Player = require("./player.js");
var Game = require("./game.js");

var currentGame = new Game();
var currentWord;
var currentPlayer;
var hangman;
var guess;

initGame();



function initGame() {

	console.log("Welcome to the game of Hangman.")
	currentGame.howToPlay();
	currentGame.setCategoryArray();

	inquirer
	  .prompt([
	    {
  		//prompt player for name
	      type: "input",
  		  message: "Please enter your name to continue.\n",
  		  name: "playername", 
	    },
	    {
  		//prompt player for category
	      type: "list",
	      message: "Starting new game. Please choose a category:",
	      choices: currentGame.getCategoryArray(),
	      name: "category",
	      default: 0
		}
	  ])
	  .then(function(inquirerResponse) {

	  	currentPlayer = new Player(inquirerResponse.playername);
	  	currentGame.setPlayer(currentPlayer);
		currentGame.setCurrCat(inquirerResponse.category);
		currentGame.getWordList();
		currentGame.getNextWord();
		currentGame.createWord();
		currentWord = currentGame.getWordObj();
		currentWord.wordToArray();
		// currentWord.wordToArray();
		currentWord.setLetterArray();
		currentWord.displayPuzzle();	
		hangman = currentWord.getHangingMan();
		// hangman.displayStatus();
		// hangman.getRemainingGuesses();
		gamePlay();

	  });
};

function gamePlay() {
	inquirer
	  .prompt([
	    {
  		//prompt player for guess
	      type: "input",
  		  message: hangman.displayStatus(),
  		  name: "guess", 
	    }	  ])
	  .then(function(inquirerResponse) {
	  	guess = inquirerResponse.guess.toLowerCase();
	  	// console.log(guess);
	  	if(!currentWord.guessCheck(guess)) {
	  		if(hangman.getRemainingGuesses() > 0) {
		  		console.log("Incorrect!".bgRed);
		  		gamePlay();
	  		}
	  		else if(hangman.getRemainingGuesses() <= 0) {
		  		console.log(hangman.displayStatus());
		  		console.log("Sorry ".yellow + currentPlayer.getName() + ", you've failed!".yellow);
		  		currentPlayer.addLoss();
		  		currentGame.getScore();
		  		inquirer
				  .prompt([
				    {
				      type: "confirm",
			  		  message: "Would you like to try again?\n",
			  		  name: "startover", 
			  		  default: true,
					},
				    {
				      type: "confirm",
			  		  message: "Would you like to choose a new category?\n",
			  		  name: "newcategory", 
			  		  default: false,
					}
				  ])
				  .then(function(inquirerResponse) {
				  	if(!inquirerResponse.startover) {
				  		console.log("Goodbye...".yellow);
				  	}
				  	else if(inquirerResponse.newcategory) {
				  		newCategory();
				  	}
				  	else if(!inquirerResponse.newcategory) {
				  		currentGame.getNextWord();
						currentGame.createWord();
						currentWord = currentGame.getWordObj();
						currentWord.wordToArray();
						currentWord.setLetterArray();
						currentWord.displayPuzzle();	
						hangman = currentWord.getHangingMan();
						gamePlay();

				  	}
				});
		  	}
	  		// else {
	  		// gamePlay();
	  		// }
	  	}
	  	else if(currentWord.guessCheck(guess)) {
	  		console.log("Correct!".bgGreen);
		  	if(currentWord.wordCheck()) {
		  		console.log(hangman.displayStatus());
		  		console.log("Congratulations ".bgMagenta + currentPlayer.getName() + ", you've guessed the word!".bgMagenta);
		  		currentPlayer.addWin();
		  		currentGame.getScore();
		  		inquirer
				  .prompt([
				    {
			  		//prompt player for name
				      type: "confirm",
			  		  message: "Would you like to play again?\n",
			  		  name: "startover", 
			  		  default: true
					},
				    {
				      type: "confirm",
			  		  message: "Would you like to choose a new category?\n",
			  		  name: "newcategory", 
			  		  default: false,
					}
				  ])
				  .then(function(inquirerResponse) {
				  	if(!inquirerResponse.startover) {
				  		console.log("Goodbye...".yellow);
				  	}
				  	else if(inquirerResponse.newcategory) {
				  		newCategory();
				  	}
				  	else if(!inquirerResponse.newcategory) {
				  		currentGame.getNextWord();
						currentGame.createWord();
						currentWord = currentGame.getWordObj();
						currentWord.wordToArray();
						currentWord.setLetterArray();
						currentWord.displayPuzzle();	
						hangman = currentWord.getHangingMan();
						gamePlay();
				  	}
				});
		  	}
		  	else {
	  		gamePlay();
	  		}
		 }

	  });
};

function newCategory() {
	inquirer
	  .prompt([
	    {
  		//prompt player for category
	      type: "list",
	      message: "Please choose a category:",
	      choices: currentGame.getCategoryArray(),
	      name: "category",
	      default: 0,
		}
	  ])
	  .then(function(inquirerResponse) {
		  	// currentPlayer = new Player(inquirerResponse.playername);
		  	// currentGame.setPlayer(currentPlayer);
			currentGame.setCurrCat(inquirerResponse.category);
			currentGame.getWordList();
			currentGame.getNextWord();
			currentGame.createWord();
			currentWord = currentGame.getWordObj();
			currentWord.wordToArray();
			// currentWord.wordToArray();
			currentWord.setLetterArray();
			currentWord.displayPuzzle();	
			hangman = currentWord.getHangingMan();
			// hangman.displayStatus();
			// hangman.getRemainingGuesses();
			gamePlay();
	  });


};



  //display gameplay info and allowable commands
  //display current game state (word, score, guesses, category, remaining guesses)
  //display hangman graphic (separate constructor?)
  //prompt player for guesses
  //prompt player when game lost/won
  //ask player if continuing game
  //ask player if changing category/difficulty level?
