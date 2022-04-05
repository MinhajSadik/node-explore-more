const path = require("path");
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");

//path module
// const myPath =
//   "/Users/minhajsadik/Documents/All-Projects/node-explore-more/index.js";

// console.log(path.dirname(myPath));
// console.log(path.dirname(myPath));
// console.log(path.extname(myPath));
// console.log(path.parse(myPath));

//os module
// console.log(os.platform());
// console.log(os.homedir());
// console.log(os.freemem());
// console.log(os.cpus());

//fs module
// fs.writeFile("notes.txt", "This is my first note, ");
fs.writeFile("notes.txt", "This is my first note, ", (err) => {
  if (err) {
    console.log("Unable to write file");
  } else {
    console.log("File written successfully");
  }
});
// // fs.writeFileSync("notes.txt", "This is my note 2"); //this will overwrite the previous note

// fs.appendFile("notes.txt", "This is my note 2 appended");

fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Data: ", data);
  }
});

console.log("After reading the file");

//EventEmitter module

const emitter = new EventEmitter();

//register a listener for the event "message"
emitter.on("event", () => {
  console.log("Event Fired");
});

//emit the event "message" it means raise the event
emitter.emit("event");
