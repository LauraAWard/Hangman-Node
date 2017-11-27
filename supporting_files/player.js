 // console.log("player is loaded");

var Player = function(name) {

	//variable to store player name
	this.name = name;
 
	//variable to store player password
	this.password = "";

	//variable to store player difficulty setting?
	this.wins = 0;
	this.losses = 0;

	//function to take in user name and create settings file?
	//function to return player name
	this.getName = function() {
		return this.name;
	}

	this.getWins = function() {
		return this.wins;
	}
	this.getLosses = function() {
		return this.losses;
	}
	this.addWin = function() {
		this.wins++;
	}
	this.addLoss = function() {
		this.losses++;
	}


};

module.exports = Player;
 