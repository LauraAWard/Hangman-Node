var fs = require("fs");

console.log("wordlist is loaded");


var WordList = function(category) {
  
  //variable to store category of wordlist
  this.category = category;
  //variable to store array of words
  this.wordArray = [];

  this.wordSelected = "";

  this.getWords = function() {
     
      fs.readFile("wordlists/" + this.category + ".txt", "utf8", function(error, data) {

      if (error) {
        return console.log("There was an error reading the wordlist file: " + error);
      }
      //feed words into array, separated at commas
      this.wordArray = data.split(",");
          // console.log(this.wordArray);
          
      var index = (Math.floor(Math.random() * this.wordArray.length));
      this.wordSelected = this.wordArray[index]; 
       console.log(this.wordSelected + "from getWords"); 
       this.wordArray.splice(index, 1);  
       return this.wordSelected;
    });
  };

  //function to remove words already played from wordlist array
  this.removeWord = function(word) {
    var index = this.wordArray.indexOf(word);
    if(index > -1) {
      this.wordArray.splice(index, 1);
    }
  };

  //function to return word from wordlist array
  //can take in difficulty level and category if using
  //this should return the word as string
  this.setWordSelected = function() {
    console.log(this.wordArray);
    var index = (Math.floor(Math.random() * this.wordArray.length));
    console.log(this.wordArray.length);
    console.log(index);
    this.wordSelected = this.wordArray[index];
    console.log(this.wordSelected);
    this.removeWord(this.wordSelected);
  };

  this.getWordSelected = function() {
    return this.wordSelected;
  };

  //function to determine word difficulty?
  //could be based on length, common letters


};

module.exports = WordList;