console.log("player is loaded");

var Player = function(name) {

	//variable to store player name
	this.name = name;
	//variable to store player password
	//variable to store player difficulty setting?

	//function to take in user name and create settings file?
	//function to return player name
	this.getName = function() {
		return this.name;
	}


};

module.exports = Player;
 