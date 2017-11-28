//import packages
var inquirer = require("inquirer");
var colors = require("colors");
var request = require("request"); //did not end up using API
var fs = require("fs"); //did not end up using

//get constructor and object data from files
var Word = require("./supporting_files/word.js");
var WordList = require("./supporting_files/wordlist.js");
var Letter = require("./supporting_files/letter.js");
var Player = require("./supporting_files/player.js");
var Game = require("./supporting_files/game.js");

//create game object
var currentGame = new Game();

//declaring some variables which will be assigned values below
var currentWord;
var currentPlayer;
var hangman;
var guess;


initializeGame();


//function to initialize and start game
function initializeGame() {

	console.log("Welcome to the game of Hangman.".zebra)
	//display game instructions
	currentGame.howToPlay();
	//read file to get wordlist categories
	currentGame.setCategoryArray();

	inquirer
	  .prompt([
	    {
  		//prompt player for name so messages can be personalized
	      type: "input",
  		  message: "Please enter your name to continue.\n",
  		  name: "playername", 
	    },
	    {
  		//prompt player for wordlist category
	      type: "list",
	      message: "Starting new game. Please choose a category:",
	      choices: currentGame.getCategoryArray(),
	      name: "category",
	      default: 0
		}
	  ])
	  .then(function(inquirerResponse) {
	  	// create player object to store name and score info
	  	currentPlayer = new Player(inquirerResponse.playername);
	  	//use game method to create a reference to player in game object
	  	currentGame.setPlayer(currentPlayer);
		//use game method to feed category info to game object
		currentGame.setCurrCat(inquirerResponse.category);
		//use game method to create wrodlist based on category chosen
		currentGame.getWordList();
		//use game method to select puzzle word from wordlist
		currentGame.getNextWord();
		//use game method to create word object
		currentGame.createWord();
		//create reference to word object here
		currentWord = currentGame.getWordObj();
		//use word method to parse current puzzle word into array
		currentWord.wordToArray();
		//use word method to create array of letter objects based on puzzle word
		currentWord.setLetterArray();
		//use word method to gather game data for display (this is fed into hangingman object created by word object)
		currentWord.displayPuzzle();
		//create reference to hangingman object	
		hangman = currentWord.getHangingMan();
		//begin gamplay
		gamePlay();

	  });
};

//function for main gameplay - this is looped through until puzzle is either solved or failed
function gamePlay() {
	inquirer
	  .prompt([
	    {
  		//prompt player for guess
	      type: "input",
  		  //this displays all gameplay info, hanging man graphic, puzzle progress, 
  		  //bad guesses, category, remaining guesses
  		  message: hangman.displayStatus(), 
  		  name: "guess", 
	    }	  ])
	  .then(function(inquirerResponse) {
	  	//change player guess to lowercase //function to test if input is valid character - not implemented yet
	  	guess = inquirerResponse.guess.toLowerCase();
	  	//feed player guess to method in word object to evaluate
	  	//if false (bad guess) and there are still guesses remaining (method in hangingman)
	  	//give feedback to user and continue play
	  	if(!currentWord.guessCheck(guess)) {
	  		if(hangman.getRemainingGuesses() > 0) {
		  		console.log("Incorrect!".bgRed);
		  		gamePlay();
	  		}
	  		//if user has no more guesses remaining, give feedback
	  		else if(hangman.getRemainingGuesses() <= 0) {
		  		console.log(hangman.displayStatus());
		  		console.log("Sorry ".yellow + currentPlayer.getName() + ", you've failed!".yellow);
		  		//update final score (entire game lost)
		  		currentPlayer.addLoss();
		  		//display score
		  		currentGame.getScore();
		  		inquirer
				  .prompt([
				    {	//prompt player to play again
				      type: "confirm",
			  		  message: "Would you like to try again?\n",
			  		  name: "startover", 
			  		  default: true,
					},
				    {	//prompt player to choose another worklist category (maybe something easier!)
				      type: "confirm",
			  		  message: "Would you like to choose a new category?\n",
			  		  name: "newcategory", 
			  		  default: false,
					}
				  ])
				  .then(function(inquirerResponse) {
				  	//if player does no want to play again, end game
				  	if(!inquirerResponse.startover) {
				  		console.log("Goodbye...".yellow);
				  	}//if player wants to pick a new category, run through that selection menu
				  	else if(inquirerResponse.newcategory) {
				  		newCategory();
				  	}//if player wants to contine playing in current category
				  	else if(!inquirerResponse.newcategory) {
				  		//use game method to select new puzzle word from existing wordlist
				  		currentGame.getNextWord();
						//use game method to create new word object
						currentGame.createWord();
						//create a reference to the word object
						currentWord = currentGame.getWordObj();
						//use word method to parse new puzzle word into array of letters
						currentWord.wordToArray();
						//use word method to create letetr objects for each letter
						currentWord.setLetterArray();
						//use word method to gather game data for display
						currentWord.displayPuzzle();
						//create reference to hanging man object	
						hangman = currentWord.getHangingMan();
						//continue playing game
						gamePlay();

				  	}
				});
		  	}
	  	}
	  	//feed player guess to method in word object to evaluate
	  	//if true (good guess) 
	  	//give feedback to user and continue play
	  	else if(currentWord.guessCheck(guess)) {
	  		console.log("Correct!".bgGreen);
		  	//check if entire word puzzle has been solved
		  	if(currentWord.wordCheck()) {
		  		//display final game status data 
		  		console.log(hangman.displayStatus());
		  		console.log("Congratulations ".bgMagenta + currentPlayer.getName() + ", you've guessed the word!".bgMagenta);
		  		//update total game score
		  		currentPlayer.addWin();
		  		//display game score
		  		currentGame.getScore();
		  		inquirer
				  .prompt([
				    {//prompt player to play again
				      type: "confirm",
			  		  message: "Would you like to play again?\n",
			  		  name: "startover", 
			  		  default: true
					},
				    {//prompt player to choose new category
				      type: "confirm",
			  		  message: "Would you like to choose a new category?\n",
			  		  name: "newcategory", 
			  		  default: false,
					}
				  ])
				  .then(function(inquirerResponse) {
				  	//if player does not want to continue play, end game
				  	if(!inquirerResponse.startover) {
				  		console.log("Goodbye...".yellow);
				  	}//if player wants to chaneg category (maybe something harder!), run through that selection menu
				  	else if(inquirerResponse.newcategory) {
				  		newCategory();
				  	}//if player wants to contine playing in current category
				  	else if(!inquirerResponse.newcategory) {
				  		//use game method to select next word from existing wordlist
				  		currentGame.getNextWord();
						//use game method to create word object
						currentGame.createWord();
						//use word method to create reference to that word object
						currentWord = currentGame.getWordObj();
						//use word method to parse the word into array of letters
						currentWord.wordToArray();
						//use word method to create array of letter objects
						currentWord.setLetterArray();
						//use word method to gather word puzzle data to display
						currentWord.displayPuzzle();	
						//create reference to hanging man object
						hangman = currentWord.getHangingMan();
						//continue playing game
						gamePlay();
				  	}
				});
		  	}
		  	else {
	  		//if word puzzle has not been solved yet, continue gamplay
	  		gamePlay();
	  		}
		 }

	  });
};

function newCategory() {
	inquirer
	  .prompt([
	    {
  		//prompt player for category, if new category desired
	      type: "list",
	      message: "Please choose a category:",
	      choices: currentGame.getCategoryArray(),
	      name: "category",
	      default: 0,
		}
	  ])
	  .then(function(inquirerResponse) {
			//use game method to set new category selected
			currentGame.setCurrCat(inquirerResponse.category);
			//use game method to create new wordlist based on category selected
			currentGame.getWordList();
			//use game method to select next puzzle word from wordlist
			currentGame.getNextWord();
			//create new word object
			currentGame.createWord();
			//create reference to word object
			currentWord = currentGame.getWordObj();
			//use word method to parse word into array of letters
			currentWord.wordToArray();
			//use word method to create array of letter objects based on word
			currentWord.setLetterArray();
			//ose word method to gather puzzle data to display
			currentWord.displayPuzzle();	
			//create reference to hanging man object
			hangman = currentWord.getHangingMan();
			//continue gameplay
			gamePlay();
	  });


};

	
  	
