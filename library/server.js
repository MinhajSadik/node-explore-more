/**
 * Title: Server Library
 * Description: Server Related Functions
 * Author: Minhaj Sadik;
 * Date: 28/04/2022;
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");

// server object - module scaffolding
const server = {};

// config object
server.config = {
  PORT: process.env.PORT || 3000,
};

// handle request response
server.handleReqRes = handleReqRes;

// console.log(__dirname);

//create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  createServerVariable.listen(server.config.PORT, () => {
    // console.log(`envirotment: ${process.env.NODE_ENV}`);
    console.log(`Listening Server On PORT ${server.config.PORT}`);
  });
};

// start server
server.init = () => {
  server.createServer();
};

// export module
module.exports = server;
