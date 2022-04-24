/**
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defiend links
 * Author: Minhaj Sadik;
 * Date: 12/04/2022;
 */

// Dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const enviroment = require("./helpers/enviroment");
const data = require("./library/data");

// app object - module scaffolding
const app = {};

//testing file system
// @TODO - remove this
data.delete("test", "newFile", (err, data) => {
  console.log(err, data);
});

// // config object
// app.config = {
//   PORT: process.env.PORT || 3000,
// };

// handle request response
app.handleReqRes = handleReqRes;

// console.log(__dirname);

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(enviroment.httpPort, () => {
    // console.log(`envirotment: ${process.env.NODE_ENV}`);
    console.log(`Listening Server On PORT ${enviroment.httpPort}`);
  });
};

// start server
app.createServer();
