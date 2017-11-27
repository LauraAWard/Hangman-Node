 // console.log("game is loaded");

var fs = require("fs"); //did not end up using
var colors = require("colors");
var Word = require("./word.js");
var WordList = require("./wordlist.js");


//game object constructor function 
var Game = function() {


	//boolean variable for is active
	this.gameActive = true;

	//variable to store current word
	this.currentWord = "";

	//variable to store current category
	this.currentCategory = "";

	//variable to store current guessed letter
	this.currentGuess = "";

	//variable to store current player input command -- not implemented in interface
	this.currentCommand = "";

	//variable to store current player
	this.player = null;

	//variable to store current word object
	this.wordObj = null;

	//variable to store gameplay instructions
	this.gameInstructions = "You will be presented with a hidden word, represented by a row a of dashes, based on the category chosen. Try to guess the word by typing a single letter at a time.  If the letter chosen is on the word, that letter will be revealed in the word.  If not, the letter will be added to a list of bad guesses so that you do not select it again.  Each time you guess a letetr that is not in the word, the hanging man will grow.  Try to guess the entire word before you run out of guesses!";
	
	//array to store current wordlist
	this.currentWordList = [];

	//array to store current wordlist categories
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
	
	//function to set reference to player object
	this.setPlayer = function(player) {
		this.player = player;
	};
	
	//function to get reference to player object
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

	//function to ereturn current wordlist categpry
	this.getCurrCat = function() {
		return this.currentCategory;
	};

	//functin to set current wordlist category
	this.setCurrCat = function(category) {
		this.currentCategory = category;
		console.log("The new category is " + this.currentCategory);
	};

	//function to retrieve wordlist from wordlist object based on current category
	this.getWordList = function() {
		for(i = 0; i < WordList.options.length; i++) {

			if(WordList.options[i].category === this.getCurrCat()) {
				this.currentWordList = WordList.options[i].words;
			}
		}
	};

	//function to retrive current puzzle word
	this.getCurrWord = function() {
		return this.currentWord;
	};

	//function to retrieve categories from wordlist object
	this.setCategoryArray = function() {
		for(i = 0; i < WordList.options.length; i++) {
			this.categoryArray.push(WordList.options[i].category);
		}
	};

	//function to return category array
	this.getCategoryArray = function() {
		return this.categoryArray;
	};

	//function to remove word from wordlist once it is in play, to avoid repeating words in same category
	this.removeWord = function(word) {
	    var index = this.currentWordList.indexOf(word);
	    if(index > -1) {
	      this.currentWordList.splice(index, 1);
	    }
  	};

  	//function to select next word from wordlist
  	this.getNextWord = function() {
	    var index = (Math.floor(Math.random() * this.currentWordList.length));
	    this.currentWord = this.currentWordList[index];
	    this.removeWord(this.currentWord);
 	};

 	//function to create word object on current puzzle word
 	this.createWord = function() {
 		this.wordObj = new Word(this.currentWord, this.currentCategory);
 	};

 	//function to return current word object
 	this.getWordObj = function() {
 		return this.wordObj;
 	};

};

module.exports = Game
 