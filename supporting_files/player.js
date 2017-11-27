 // console.log("player is loaded");

//player object constructor function
var Player = function(name) {

	//variable to store player name
	this.name = name;
 
	//variable to store player password -- not implemented in interface
	this.password = "";

	//variables to store player overall game wins/losses
	this.wins = 0;
	this.losses = 0;

	//function to return player name
	this.getName = function() {
		return this.name;
	}

	//function to return player wins
	this.getWins = function() {
		return this.wins;
	}

	//function to return player losses
	this.getLosses = function() {
		return this.losses;
	}
	
	//function to increment player wins
	this.addWin = function() {
		this.wins++;
	}
	
	//function to increment player losses
	this.addLoss = function() {
		this.losses++;
	}


};

module.exports = Player;
 