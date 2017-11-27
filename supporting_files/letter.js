 // console.log("letter is loaded");

//letter object constructor function
var Letter = function(letter) {

	//boolean variable for show/hide
	this.show = false; 
	//variable to store actual letter/character value
	this.value = letter;
	//default value for puzzle display
	this.default = "_";
};

//function to flip show/hide variable -- do as prototype
Letter.prototype.revealLetter = function() {
	if(!this.show) {
		this.show = true;
	}
};

//function to return character value -- do as prototype
Letter.prototype.getValue = function() {
	return this.value;
};

//function to return visibility status -- do as prototype
Letter.prototype.getStatus = function() {
	return this.show;
};

module.exports = Letter;
 