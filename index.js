/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defiend links
 * Author: Minhaj Sadik;
 * Date: 12/04/2022;
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// app object - module scaffolding
const app = {};

// config object
app.config = {
  PORT: process.env.PORT || 3000,
};

// handle request response
app.handleReqRes = handleReqRes;

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.PORT, () => {
    console.log(`Server Runed on PORT ${app.config.PORT}`);
  });
};

// start server
app.createServer();
