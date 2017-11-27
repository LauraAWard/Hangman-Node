 // console.log("game is loaded");

// var fs = require("fs");
var colors = require("colors");
var Word = require("./word.js");
var WordList = require("./wordlist.js");
// var Letter = require("./letter.js");

 
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

	//variable to store current player
	this.player = null;

	this.wordObj = null;

	//variable to store gameplay instructions
	this.gameInstructions = "This is how to play.";

	this.currentWordList = [];

	this.categoryArray = [];

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

	//function to return game state
	this.getGameStatus = function() {
		return this.gameActive;
	};
	this.setPlayer = function(player) {
		this.player = player;
	};
 	this.getPlayer = function() {
		return this.player;
	};

	//function to display score
	this.getScore = function() {
		console.log(this.player.getName() + ", you have won ".cyan + this.player.getWins() + " rounds and lost ".cyan + this.player.getLosses());
	};

	//function to display game instructions
	this.howToPlay = function() {
		console.log(this.gameInstructions);
	};


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
	};

	this.getCurrWord = function() {
		return this.currentWord;
	};

	this.setCategoryArray = function() {
		for(i = 0; i < WordList.options.length; i++) {
			this.categoryArray.push(WordList.options[i].category);
		}
	};

	this.getCategoryArray = function() {
		return this.categoryArray;
	};

	this.removeWord = function(word) {
	    var index = this.currentWordList.indexOf(word);
	    if(index > -1) {
	      this.currentWordList.splice(index, 1);
	    }
  	};

  	this.getNextWord = function() {
	    var index = (Math.floor(Math.random() * this.currentWordList.length));
	    this.currentWord = this.currentWordList[index];
	    this.removeWord(this.currentWord);
 	};

 	this.createWord = function() {
 		this.wordObj = new Word(this.currentWord, this.currentCategory);
 	};

 	this.getWordObj = function() {
 		return this.wordObj;
 	};

};

module.exports = Game
 