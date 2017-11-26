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

	  	switch(inquirerResponse.action) {
	  		case "Play new game":
	  			console.log("Starting new game");
	  			inquirer
	  				.prompt([
				    {
				      type: "list",
				      message: "Please choose a category:",
				      choices: ["Thanksgiving", "Mythology", "Hobbies"],
				      name: "category",
				      default: 0
				    }
		  			])
		  			.then(function(inquirerResponse) {
		  				currentGame.setCurrCat(inquirerResponse.category);
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
