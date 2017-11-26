console.log("game is loaded");

var Game = function() {


	//boolean variable for is active
	this.gameActive = true;
	//variable to store current word
	this.currentWord = "";
	//variable to store current category?
	this.currentCategory = "";
	//variable to store current player => leave in main?
	//variable to store current guessed letter
	this.currentGuess = "";
	//variable to store current player input command
	this.currentCommand = "";
	//variable to store array of guessed letters => put in Word?
	//variable to store player score
	this.player = null;
	this.playerWins = 0;
	this.playerLosses = 0;
	//variable to store player remaining guesses => put in Word, so reinitialzed each new word
	//variable to store gameplay instructions
	this.gameInstructions = "This is how to play.";
	//function to test if input is valid character
	//function to flip character to caps
	//should inquirer functions go here?
	//function to set game state to active/ended
	this.getGameStatus = function() {
		return this.gameActive;
	};
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
  	//function to update array of guessed letters?
	//function to keep score
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


};

module.exports = Game
 