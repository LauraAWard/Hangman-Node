//import packages
var inquirer = require("inquirer");
var colors = require("colors");
var request = require("request");
var fs = require("fs");

//get data from file
var Word = require("./supporting_files/word.js");
// var WordList = require("./supporting_files/wordlist.js");
// var Letter = require("./supporting_files/letter.js");
var Player = require("./supporting_files/player.js");
var Game = require("./supporting_files/game.js");

var currentGame = new Game();
var currentWord;
var currentPlayer;
var hangman;
var guess;

initializeGame();



function initializeGame() {

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
		currentWord.setLetterArray();
		currentWord.displayPuzzle();	
		hangman = currentWord.getHangingMan();
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
			currentGame.setCurrCat(inquirerResponse.category);
			currentGame.getWordList();
			currentGame.getNextWord();
			currentGame.createWord();
			currentWord = currentGame.getWordObj();
			currentWord.wordToArray();
			currentWord.setLetterArray();
			currentWord.displayPuzzle();	
			hangman = currentWord.getHangingMan();
			gamePlay();
	  });


};

	//function to test if input is valid character
	//function to flip character to caps
  	//display gameplay info and allowable commands
