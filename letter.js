// console.log("letter is loaded");

var Letter = function(letter) {

		//boolean variable for show/hide
	this.show = false;
		//variable to store actual letter value
	this.value = letter;

	this.default = "_";
};

	//function to flip show/hide variable -- do as prototype
Letter.prototype.revealLetter = function() {
	if(!this.show) {
		this.show = true;
	}
};

Letter.prototype.getValue = function() {
	return this.value;
};

Letter.prototype.getStatus = function() {
	return this.show;
};

module.exports = Letter;
 