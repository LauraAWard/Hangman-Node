// console.log("word is loaded");

var Letter = require("./letter.js");
var HangingMan = require("./hanging_man.js");


var Word = function(word, category) {
  

  //variable to store word as string
  this.wordString = word;
  this.wordCategory = category;
  this.wordArray = [];
  // this.puzzle = "";
  // this.guesses = "";
  //variable to store array of letter objects
  this.letterArray = [];
  //variable to store array of incorrect guessed letters
  this.badGuesses = [];
  //variable for hanging man display object
  this.hangingMan = new HangingMan(this.wordCategory);

  //function to turn word string into array
  this.wordToArray = function() {
  	this.wordArray = this.wordString.split("");
  	// console.log("wordToArray");
  };
  //function to set word string value
  this.setWord = function(word) {
  	this.wordString = word;
  };

  //function to create array of letter objects
  this.setLetterArray = function() {
  	for(i = 0; i < this.wordArray.length; i++) {
  		var temp = new Letter(this.wordArray[i]);
  		this.letterArray.push(temp);
  		if(this.wordArray[i] === " ") {
  			this.letterArray[i].revealLetter();
  		}
  	}
  	// console.log("setLetterArray");
  };

  //function to cycle through letter object array and display 
  //letters or hidden values
  this.displayPuzzle = function() {
  	var puzzle = "";
  	for(i = 0; i < this.letterArray.length; i++) {
  		if(this.letterArray[i].show) {
  			// console.log(this.letterArray[i].value + " ");
  			puzzle += this.letterArray[i].value + " ";
  		}
  		else {
  			// console.log(this.letterArray[i].default + " ");
  			puzzle += this.letterArray[i].default + " ";
  		} 		
  	}
  	this.hangingMan.updatePuzzle(puzzle);
  	// console.log(puzzle);
  };

  //function to cycle through letter object array and match
  //guesses against letters, calling letter function to 
  //switch display to reveal
  this.guessCheck = function(letter) {
   	var match = false;
   	for(i = 0; i < this.letterArray.length; i++) {
  		if(this.letterArray[i].value === letter) {
  			this.letterArray[i].revealLetter();
  			match = true;
  		}
  	}
  	if(match === false && this.badGuesses.indexOf(letter) === -1) {
  		this.badGuesses.push(letter);
  		this.hangingMan.strikeOne();
  	}
  	this.displayPuzzle();
  	this.displayBadGuesses();
  	return match;
  };
  this.wordCheck = function() {
   	var complete = false;
   	var revealed = 0;
   	for(i = 0; i < this.letterArray.length; i++) {
  		if(this.letterArray[i].getStatus()) {
  			revealed++;
  		}
  	}
  	if(revealed === this.letterArray.length) {
  		complete = true;
  	}
  	return complete;
  };
//function to display incorrectly guessed letters
  this.displayBadGuesses = function() {
  	var guesses = "";
  		// console.log("(" + this.badGuesses.join(" ") + ")");
  	// this.guesses = "";
  	// var guesses = "(" + this.badGuesses.join(", ") + ")";
	guesses = guesses.concat("(", this.badGuesses.join(", "), ")");
  	this.hangingMan.updateGuesses(guesses);
  	// console.log(guesses);
  };

  this.getHangingMan = function() {
  	return this.hangingMan;
  };

  this.updateHangingMan = function() {
  	this.displayPuzzle();
  	this.displayBadGuesses();
  };


};


module.exports = Word;
 