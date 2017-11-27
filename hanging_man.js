console.log("HangingMan is loaded");



var HangingMan = function(category) {

	this.category = category;
	this.word = "blah";
	this.ltrGuesses = "blah";
	this.remaining = 7;

	this.hanging7 = "\n   ___ " + "   Category: " + this.category +	"\n  |  \\|" + 
					"\n      |" + "   Word: " + this.word + "\n      |" + 
					"\n      |" + "   Letters Guessed: " + this.ltrGuesses + "\n      |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging6 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n      |" + 
					"\n      |" + "   Letters Guessed: " + this.ltrGuesses + "\n      |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging5 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n  |   |" + 
					"\n      |" + "   Letters Guessed: " + this.ltrGuesses + "\n      |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging4 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n \\|   |" + 
					"\n      |" + "   Letters Guessed: " + this.ltrGuesses + "\n      |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging3 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n \\|/  |" + 
					"\n      |" + "   Letters Guessed: " + this.ltrGuesses + "\n      |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging2 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n \\|/  |" + 
					"\n  |   |" + "   Letters Guessed: " + this.ltrGuesses + "\n      |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging1 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n \\|/  |" + 
					"\n  |   |" + "   Letters Guessed: " + this.ltrGuesses + "\n /    |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hanging0 = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n \\|/  |" + 
					"\n  |   |" + "   Letters Guessed: " + this.ltrGuesses + "\n / \\  |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + "\n";	

	this.hangingf = "\n   ___ " + "   Category: " + this.category + "\n  |  \\|" + 
					"\n  o   |" + "   Word: " + this.word + "\n \\|/  |" + 
					"\n  |   |" + "   Letters Guessed: " + this.ltrGuesses + "\n / \\  |" + 
					"\n   ___|_" + "  Remaining Guesses: " + this.remaining + 
					"\n You have failed, enter any key to continue.\n";	

	this.updatePuzzle = function(puzzle) {
		this.word = puzzle;
	};

	this.updateGuesses = function(guesses) {
		this.ltrGuesses = guesses;
	};

	this.strikeOne = function() {
		this.remaining--;
		console.log("Incorrect");
	};

	this.getRemainingGuesses = function() {
		// console.log("remaining guesses");
		return this.remaining;
	};

	this.getbadGuesses = function() {
		console.log(this.ltrGuesses);
		return this.ltrGuesses;

	};
	this.getPuzzle = function() {
		console.log(this.word);
		return this.word;
	};

	this.displayStatus = function() {
		this.ltrGuesses = this.getbadGuesses();
		this.word = this.getPuzzle();

		switch(this.remaining) {

			case 7:

			return this.hanging7;

			break;

			case 6:
			
			return this.hanging6;
			
			break;

			case 5:
			
			return this.hanging5;
			
			break;
			
			case 4:
			
			return this.hanging4;
			
			break;
			
			case 3:
			
			return this.hanging3;
			
			break;
			
			case 2:
			
			return this.hanging2;
			
			break;
			
			case 1:
			
			return this.hanging1;
			
			break;
			
			case 0:
			
			return this.hanging0;
			
			break;
			
			case -1:
			
			return this.hangingf;
			
			break;
			
			default:
			
			return this.hangingf;
			
		}

	};

};

// var temp = new HangingMan();
// temp.ltrGuesses = "(a, b, c)";
// console.log(temp.getbadGuesses());

module.exports = HangingMan;