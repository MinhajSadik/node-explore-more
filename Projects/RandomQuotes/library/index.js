/**
 * Title: Node Explore More
 * Description: Simple Node Application that print random quotes per second interval
 * Author: Minhaj Sadik
 * Date: 14-04-22
 */

//Dependencies
const mathLibrary = require("./Projects/RandomQuotes/library/math");
const quotesLibrary = require("./Projects/RandomQuotes/library/quotes");

// app object - module scaffolding
const app = {};
app.config = {
  interval: 1000,
};

app.printAQuote = function printAQuote() {
  // get all the quotes
  const allQuotes = quotesLibrary.allQuotes();

  // get the length of the quotes
  const numberOfQuotes = allQuotes.length;

  // pick a random number between 1 and the number of quotes
  const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);

  //get the quote at that position in the array (minus one because arrays start at 0)
  const selectedQuote = allQuotes[randomNumber - 1];

  //print the quote to the console
  console.log(selectedQuote);
};

app.indefiniteLoop = function indefiniteLoop() {
  // create the interval, using the config variabale defined above
  setInterval(app.printAQuote, app.config.interval);
};

// invoke the indefinite loop
app.indefiniteLoop();
