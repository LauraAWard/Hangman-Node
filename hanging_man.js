// console.log("HangingMan is loaded");



var HangingMan = function(category) {

	this.category = category;
	this.word = "";
	this.ltrGuesses = "(  )";
	this.remaining = 7;

	this.updatePuzzle = function(puzzle) {
		this.word = puzzle;
	};

	this.updateGuesses = function(guesses) {
		this.ltrGuesses = guesses;
	};

	this.strikeOne = function() {
		this.remaining--;
	};

	this.getRemainingGuesses = function() {
		return this.remaining;
	};

	this.getbadGuesses = function() {
		return this.ltrGuesses;

	};
	this.getPuzzle = function() {
		return this.word;
	};

	this.displayStatus = function() {
		var temp = "";
		switch(this.remaining) {

			case 7:
			 	var hanging7 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n      |   Word: ",
			 				 this.getPuzzle(), "\n      |\n      |   Letters Guessed: ", this.getbadGuesses(), 
			 				 "\n      |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");	

			return hanging7;

			break;

			case 6:
				var hanging6 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
							 this.getPuzzle(), "\n      |", "\n      |   Letters Guessed: ", this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");

			return hanging6;
			
			break;

			case 5:
				var hanging5 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
							 this.getPuzzle(), "\n  |   |\n      |   Letters Guessed: ", this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");
			
			return hanging5;
			
			break;
			
			case 4:
				var hanging4 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
							 this.getPuzzle(), "\n \\|   |\n      |   Letters Guessed: ", this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");
			
			return hanging4;
			
			break;
			
			case 3:
				var hanging3 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
							 this.getPuzzle(), "\n \\|/  |\n      |   Letters Guessed: ", this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");
			
			return hanging3;
			
			break;
			
			case 2:
				var hanging2 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
							 this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ", this.getbadGuesses(),
							  "\n      |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");
			
			return hanging2;
			
			break;
			
			case 1:
				var hanging1 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
							 this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ", this.getbadGuesses(),
							  "\n /    |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");
			
			return hanging1;
			
			break;
			
			case 0:
				var hanging0 = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
				 			this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ", this.getbadGuesses(),
				  			"\n / \\  |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), "\n");
			
			return hanging0;
			
			break;
			
			case -1:
				var hangingfail = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
								 this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ", this.getbadGuesses(),
								 "\n / \\  |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), 
								 "\n You have failed, enter any key to continue.\n");
			
			return hangingfail;
			
			break;
			
			default:
				var hangingfail = temp.concat("\n   ___    Category: ", this.category, "\n  |  \\|\n  o   |   Word: ",
					 			this.getPuzzle(), "\n \\|/  |\n  |   |   Letters Guessed: ", this.getbadGuesses(),
					 			"\n / \\  |\n   ___|_  Remaining Guesses: ", this.getRemainingGuesses(), 
								 "\n You have failed, enter any key to continue.\n");

			return hangingfail;
			
		}

	};

};

// var temp = new HangingMan();
// temp.ltrGuesses = "(a, b, c)";
// console.log(temp.getbadGuesses());

module.exports = HangingMan;