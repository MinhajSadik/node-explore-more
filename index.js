const lodash = require("lodash");
const path = require("path");
const os = require("os");

//path module
const myPath =
  "/Users/minhajsadik/Documents/All-Projects/node-explore-more/index.js";

console.log(path.dirname(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));
console.log(path.parse(myPath));

//os module
console.log(os.platform());
console.log(os.platform());
console.log(os.freemem());
console.log(os.cpus());

