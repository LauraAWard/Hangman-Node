 // console.log("word is loaded");

var Letter = require("./letter.js");
var HangingMan = require("./hanging_man.js");

//word object constructor function
var Word = function(word, category) { 
  

  //variable to store word as string
  this.wordString = word;

  //variable to store current word category
  this.wordCategory = category;

  //variable to store word as array of letters
  this.wordArray = [];

  //variable to store array of letter objects
  this.letterArray = [];

  //variable to store array of incorrect guessed letters
  this.badGuesses = [];

  //variable for hanging man display object
  this.hangingMan = new HangingMan(this.wordCategory);

  //function to turn word string into array
  this.wordToArray = function() {
  	this.wordArray = this.wordString.split("");
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
  		//if there is a space in the word, create an object for it but immediately set it to reveal
      if(this.wordArray[i] === " ") {
  			this.letterArray[i].revealLetter();
  		}
  	}
  };

  //function to cycle through letter object array and display 
  //letters or hidden values
  //add spaces after each character so puzzle is spread out and easier to see
  this.displayPuzzle = function() {
  	var puzzle = "";
  	for(i = 0; i < this.letterArray.length; i++) {
  		if(this.letterArray[i].show) {
  			puzzle += this.letterArray[i].value + " ";
  		}
  		else {
  			puzzle += this.letterArray[i].default + " ";
  		} 		
  	}
    //feed puzzle string to hanging man object for display
  	this.hangingMan.updatePuzzle(puzzle);
  };

  //function to cycle through letter object array and match
  //guesses against letters, calling letter function to 
  //switch display to reveal
  this.guessCheck = function(letter) {
   	//initialize match as false, set to true if match found
    var match = false;
   	for(i = 0; i < this.letterArray.length; i++) {
  		if(this.letterArray[i].value === letter) {
  			this.letterArray[i].revealLetter();
  			match = true;
  		}
  	}
    //only add bad guesses to array and decrement remaining guesses if 
    //bad guessed letter has not already been guessed (no punishment for dup bad guesses)
  	if(match === false && this.badGuesses.indexOf(letter) === -1) {
  		this.badGuesses.push(letter);
  		this.hangingMan.strikeOne();
  	}
  	//once guessed letter has been processed, update puzzle display and bad guess array
    this.displayPuzzle();
  	this.displayBadGuesses();
  	//return success or failure of guess
    return match;
  };

  //function to check if entire word has been guessed
  this.wordCheck = function() {
   	var complete = false;
   	var revealed = 0;
   	for(i = 0; i < this.letterArray.length; i++) {
  		if(this.letterArray[i].getStatus()) {
  			revealed++;
  		}
  	}
  	//if the number of letters revealed is equal to the length of the word
    //puzzle has been solved, return true else return false
    if(revealed === this.letterArray.length) {
  		complete = true;
  	}
  	return complete;
  };

  //function to display incorrectly guessed letters
  this.displayBadGuesses = function() {
  	 var guesses = "";
	   guesses = guesses.concat("(", this.badGuesses.join(", "), ")");
  	 //feed bad guess string to hanging man object for display
     this.hangingMan.updateGuesses(guesses);
  };

  //function to return hanging man object
  this.getHangingMan = function() {
  	return this.hangingMan;
  };

  //function to update puzzle and bad guesses (to pass to hanging man)
  this.updateHangingMan = function() {
  	this.displayPuzzle();
  	this.displayBadGuesses();
  };


};


module.exports = Word;
 