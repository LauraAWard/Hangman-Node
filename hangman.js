//import packages
var inquirer = require("inquirer");
//process.stdout.isTTY = true;  //might need this
var colors = require("colors");
var request = require("request");
var fs = require("fs");

//get data from file
var Word = require("./word.js");
var WordList = require("./wordlist.js");
var Letter = require("./letter.js");
var Player = require("./player.js");
var Game = require("./game.js");

var currentGame = new Game();
// var currentWord = new Word();
var currentPlayer;

initGame();



function initGame() {

	console.log("Welcome to the game of Hangman.")
	currentGame.howToPlay();

	inquirer
	  .prompt([
	    {
	      type: "list",
	      message: "What would you like to do?",
	      choices: ["Play new game", "Load previous game"],
	      name: "action",
	      default: 0
	    },
	    {
	      type: "input",
  		  message: "Please enter your name to continue.\n",
  		  name: "playername", 
		}
	  ])
	  .then(function(inquirerResponse) {

	  	currentPlayer = new Player(inquirerResponse.playername);
	  	currentGame.setPlayer(currentPlayer);
	  	currentGame.setCategoryArray();
	  	
	  	switch(inquirerResponse.action) {
	  		case "Play new game":
	  			console.log("Starting new game");
	  			inquirer
	  				.prompt([
				    {
				      type: "list",
				      message: "Please choose a category:",
				      choices: currentGame.getCategoryArray(),
				      // choices: ["Thanksgiving", "Mythology", "Hobbies"],
				      name: "category",
				      default: 0
				    }
		  			])
		  			.then(function(inquirerResponse) {
		  				currentGame.setCurrCat(inquirerResponse.category);
		  				// console.log(WordList.options[0].category);
		  				// currentGame.getScore();
		  				// var done = new Promise(function(resolve, reject) {
		  					// console.log(currentGame.createWordList() + "from main");
		  				// 	if(currentGame.getCurrWord()) {
		  				// 		resolve(console.log(currentGame.getCurrWord() + "from promise"));
		  				// 	}
		  				// 	else {
		  				// 		var reason = new Error("did not work");
        //     					reject(reason);

		  				// 	}
		  				// });

		  				// done.then(function(result) {
		  					// console.log(temp + "from main");
		  				// });
		  				currentGame.getWordList();
		  				currentGame.getNextWord();
		  				currentGame.getCurrWord();
		  				// currentGame.getNextWord();
		  				// console.log(currentGame.getCurrWord());
	  			// inquirer
	  			// 	.prompt([
				  //   {
				  //     type: "confirm",
				  //     message: "Waiting for result",
				  //     name: "finally",
				  //     default: true
				  //   }
		  		// 	])
		  		// 	.then(function(inquirerResponse) {
		  		// 			console.log(currentGame.getCurrWord());
		  		// 	})
		  			})
	  			
	  			break;
	  		case "Load previous game":
	  			console.log("Loading previous game");
	  			break;

	  	}

	  });
};


  //prompt player for name
  //prompt player for difficulty level?
  //prompt player for category?
  //display gameplay info and allowable commands
  //display current game state (word, score, guesses, category, remaining guesses)
  //display hangman graphic (separate constructor?)
  //prompt player for guesses
  //prompt player when game lost/won
  //ask player if continuing game
  //ask player if changing category/difficulty level?
