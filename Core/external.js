const EventEmitter = require("events");

function startPeriod() {
  console.log("Period Started");

  //raise an event
  setTimeout(() => {
    emitter.emit("periodStarted", {
      period: "first",
      text: "period ended",
    });
  }, 2000);
}

class Periods extends EventEmitter {
  startPeriod() {
    console.log("Period Started");

    // raise an event
    setTimeout(() => {
      this.emit("periodEvent", {
        period: "first",
        text: "period ended",
      });
    }, 2000);
  }
}

module.exports = Periods;


const path = require("path");
const os = require("os");
const fs = require("fs");
const { chunk } = require("lodash");
const EventEmitter = require("events");
const Periods = require("./external");
path module
const myPath =
  "/Users/minhajsadik/Documents/All-Projects/node-explore-more/index.js";

console.log(path.dirname(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));
console.log(path.parse(myPath));

os module
console.log(os.platform());
console.log(os.homedir());
console.log(os.freemem());
console.log(os.cpus());

fs module
fs.writeFile("notes.txt", "This is my first note, ");
fs.writeFile("notes.txt", "This is my first note, ", (err) => {
  if (err) {
    console.log("Unable to write file");
  } else {
    console.log("File written successfully");
  }
});

// fs.writeFileSync("notes.txt", "This is my note 2"); //this will overwrite the previous note

fs.appendFile("notes.txt", "This is my note 2 appended");

fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Data: ", data);
  }
});

console.log("After reading the file");

EventEmitter module
const emitter = new EventEmitter();

register a listener for the event "message"
emitter.on("periodStarted", ({ period, text }) => {
  console.log(`Event Fired Period Starting ${period} ${text}`);
});

which Object created for emiting same object need for listening this event otherwise it won't works recognized
const period = new Periods();
period.on("periodEvent", ({ period, text }) => {
  console.log(`Event Fired for Period Start ${period} ${text}`);
});
period.startPeriod();

emit the event "message" it means raise the event
emitter.emit("event");

const ourReadStreem = fs.createReadStream(`${__dirname}/notes.txt`, "utf8");
const ourWriteStreem = fs.createWriteStream(`${__dirname}/output.txt`, "utf8");

ourReadStreem.on("data", (chunk) => {
  ourWriteStreem.write(chunk);
});

ourReadStreem.pipe(ourWriteStreem);

