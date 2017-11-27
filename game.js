console.log("game is loaded");

var fs = require("fs");
var Word = require("./word.js");
var WordList = require("./wordlist.js");
var Letter = require("./letter.js");


var Game = function() {


	//boolean variable for is active
	this.gameActive = true;
	//variable to store current word
	this.currentWord = "";
	//variable to store current category?
	this.currentCategory = "";
	//variable to store current guessed letter
	this.currentGuess = "";
	//variable to store current player input command
	this.currentCommand = "";
	//variable to store array of guessed letters => put in Word?
	//variable to store current player => leave in main?
	this.player = null;
	//variable to store player score
	// this.playerWins = 0;
	// this.playerLosses = 0;
	//variable to store player remaining guesses => put in Word, so reinitialzed each new word
	//variable to store gameplay instructions
	this.gameInstructions = "This is how to play.";
	this.currentWordList = [];
	this.categoryArray = [];

	//function to test if input is valid character
	//function to flip character to caps
	//should inquirer functions go here?
	//function to set game state to active/ended
	this.setGameActive = function(bool) {
		this.gameActive = bool;
		if(this.gameActive === true) {
			console.log("The game is underway.");
		}
		else {
			console.log("The game has ended");
		}
	};
	this.setPlayer = function(player) {
		this.player = player;
	};
	//function to return game state
	this.getGameStatus = function() {
		return this.gameActive;
	};
  	//function to update array of guessed letters?
	//function to display score
	this.getScore = function() {
		console.log(this.player.getName() + ", you have won " + this.player.getWins() + " rounds and lost " + this.player.getLosses());
	};
	//function to reset score when new round?
	//function to display game data (category, word, guesses, score, 
	//hangman)
	//function to display game instructions
	this.howToPlay = function() {
		console.log(this.gameInstructions);
	};
	//function to save game data to file? (save for later)
	//function to load game from file? (return to saved game)
	this.getCurrCat = function() {
		return this.currentCategory;
	};
	this.setCurrCat = function(category) {
		this.currentCategory = category;
		console.log("The new category is " + this.currentCategory);
	};
	this.getWordList = function() {
		for(i = 0; i < WordList.options.length; i++) {

			if(WordList.options[i].category === this.getCurrCat()) {
				this.currentWordList = WordList.options[i].words;
			}
		}
		// this.currentWordList = WordList(this.getCurrCat());
		// this.currentWord = this.currentWordList.getWords();
		console.log(this.currentWordList);
	};
	// this.getNextWord = function() {
	// 	this.currentWordList.setWordSelected();
	// 	this.currentWord = this.currentWordList.getWordSelected();
	// };
	this.getCurrWord = function() {
		console.log(this.currentWord + "here's the word");
		return this.currentWord;
	};
	this.setCategoryArray = function() {
		for(i = 0; i < WordList.options.length; i++) {
			this.categoryArray.push(WordList.options[i].category);
		}
		console.log(this.categoryArray);
	};
	this.getCategoryArray = function() {
		return this.categoryArray;
	};

	// this.createWordList = function() {
		 
	// 	fs.readFile("wordlists/" + this.currentCategory + ".txt", "utf8", function(error, data) {

	// 	    if (error) {
	// 	      return console.log("There was an error reading the wordlist file: " + error);
	// 	    }
 //      //feed words into array, separated at commas
 //      		this.currentWordList = data.split(",");
 //          // console.log(this.wordArray);
 //          	// this.setWordSelected();
 //      var index = (Math.floor(Math.random() * this.currentWordList.length));
 //      this.currentWord = this.currentWordList[index]; 
 //       console.log(this.currentWord + "from create wordlist"); 
 //       this.currentWordList.splice(index, 1);  
 //       return this.currentWord;
 //    	});
	// };
	this.removeWord = function(word) {
	    var index = this.currentWordList.indexOf(word);
	    if(index > -1) {
	      this.currentWordList.splice(index, 1);
	    }
  	};
  	this.getNextWord = function() {
	    console.log(this.currentWordList);
	    var index = (Math.floor(Math.random() * this.currentWordList.length));
	    console.log(this.currentWordList.length);
	    console.log(index);
	    this.currentWord = this.currentWordList[index];
	    console.log(this.currentWord + "from getNextWord");
	    this.removeWord(this.currentWord);
 	};


};

module.exports = Game
 