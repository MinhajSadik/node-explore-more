/**
 * Title: Node Explore More
 * Description: Simple Node Application that print random quotes per second interval
 * Author: Minhaj Sadik
 * Date: 14-04-22
 */

//Dependencies
const fs = require("fs");

// quotes object - module scaffolding
const quotes = {};

quotes.allQuotes = function allQuotes() {
  // read the file
  const file = fs.readFileSync(`${__dirname}/quotes.txt`, "utf8");

  // parse the file
  const arrayOfQuotes = file.split(/\r?\n/);

  // return the quotes
  return arrayOfQuotes;
};

module.exports = quotes;
