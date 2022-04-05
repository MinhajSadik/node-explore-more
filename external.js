const EventEmitter = require("events");

// function startPeriod() {
//   console.log("Period Started");

//   //raise an event
//   setTimeout(() => {
//     emitter.emit("periodStarted", {
//       period: "first",
//       text: "period ended",
//     });
//   }, 2000);
// }

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
