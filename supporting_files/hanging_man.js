 // console.log("HangingMan is loaded");

var colors = require("colors");

//hanging man object constructor function
var HangingMan = function(category) {

	this.category = category; 
	this.word = "";
	this.ltrGuesses = "(  )";
	//remaining guesses, always starts with 7 for number of hanging man body parts
	this.remaining = 7; 

	//function called by word object to pass puzzle data 
	this.updatePuzzle = function(puzzle) {
		this.word = puzzle;
	};

	//function called by word object to pass guessed letter data
	this.updateGuesses = function(guesses) {
		this.ltrGuesses = guesses;
	};

	//function to decrement remaining guesses
	this.strikeOne = function() {
		this.remaining--;
	};

	//function to return remaining guesses count
	this.getRemainingGuesses = function() {
		return this.remaining;
	};

	//function to return bad guesses string
	this.getbadGuesses = function() {
		return this.ltrGuesses;

	};
	
	//function to return puzzle word (with unguessed letters hidden for display)
	this.getPuzzle = function() {
		return this.word;
	};

	//function to display hanging man based on remaining guesses, as well as
	//word category, word puzzle, bad guesses and remaining guesses
	this.displayStatus = function() {
		var temp = "";
		switch(this.remaining) {

			case 7:
			 	var hanging7 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n      |   Word: ".cyan,
			 				 this.getPuzzle(), "\n      |\n      |   Letters Guessed: ".cyan, this.getbadGuesses(), 
			 				 "\n      |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");	

			return hanging7;

			break;

			case 6:
				var hanging6 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
							 this.getPuzzle(), "\n      |", "\n      |   Letters Guessed: ".cyan, this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");

			return hanging6;
			
			break;

			case 5:
				var hanging5 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
							 this.getPuzzle(), "\n  |   |\n      |   Letters Guessed: ".cyan, this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");
			
			return hanging5;
			
			break;
			
			case 4:
				var hanging4 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
							 this.getPuzzle(), "\n \\|   |\n      |   Letters Guessed: ".cyan, this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");
			
			return hanging4;
			
			break;
			
			case 3:
				var hanging3 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
							 this.getPuzzle(), "\n \\|/  |\n      |   Letters Guessed: ".cyan, this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");
			
			return hanging3;
			
			break;
			
			case 2:
				var hanging2 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
							 this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ".cyan, this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");
			
			return hanging2;
			
			break;
			
			case 1:
				var hanging1 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
							 this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ".cyan, this.getbadGuesses(),
							  "\n /    |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");
			
			return hanging1;
			
			break;
			
			case 0:
				var hanging0 = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
				 			this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ".cyan, this.getbadGuesses(),
				  			"\n / \\  |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), "\n");
			
			return hanging0;
			
			break;
			
			case -1:
				var hangingfail = temp.concat("\n   ___    Category: ".cyan, this.category, "\n  |  \\|\n  o   |   Word: ".cyan,
								 this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ".cyan, this.getbadGuesses(),
								 "\n / \\  |\n   ___|_  Remaining Guesses: ".cyan, this.getRemainingGuesses(), 
								 "\n You have failed, enter any key to continue.\n".yellow);
			
			return hangingfail;
			
			break;
			
			default:
				var hangingfail = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
					 			this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ", this.getbadGuesses(),
					 			"\n / \\  |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), 
								 "\n You have failed, enter any key to continue.\n".yellow);

			return hangingfail;
			
		}

	};

};


module.exports = HangingMan;