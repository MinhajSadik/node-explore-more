/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defiend links
 * Author: Minhaj Sadik;
 * Date: 12/04/2022;
 */

// Dependencies
const server = require("./library/server");
const worker = require("./library/worker");

// app object - module scaffolding
const app = {};

app.init = () => {
  // start the server
  server.init();

  // start the workers
  worker.init();
};

app.init();

//export module
module.exports = app;
