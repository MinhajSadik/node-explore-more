/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defiend links
 * Author: Minhaj Sadik;
 * Date: 12/04/2022;
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environments = require("./helpers/environment");
const data = require("./library/data");
const { sendTwilioSms } = require("./helpers/notifications");

// app object - module scaffolding
const app = {};

//testing file system
// @TODO - remove this
// data.delete("test", "newFile", (err, data) => {
//   console.log(err, data);
// });

//@TODO - remove this later
sendTwilioSms("+8801781583107", "Hello World", (err, data) => {
  console.log(err, data);
});

// config object
app.config = {
  PORT: process.env.PORT || 3000,
};

// handle request response
app.handleReqRes = handleReqRes;

// console.log(__dirname);

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environments.httpPort, () => {
    // console.log(`envirotment: ${process.env.NODE_ENV}`);
    console.log(`Listening Server On PORT ${environments.httpPort}`);
  });
};

// start server
app.createServer();
