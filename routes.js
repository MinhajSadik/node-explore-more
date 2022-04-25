/**
 * Title: Routes
 * Description: Routes for the application
 * Author: Minhaj Sadik
 * Date: 12-24/04/2022
 */

// Dependencies
const { sampleHandler } = require("./handlers/routeHandler/sampleHandler");
const { userHandler } = require("./handlers/routeHandler/userHandler");
const { tokenHandler } = require("./handlers/routeHandler/tokenHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
