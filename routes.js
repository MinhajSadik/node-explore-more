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
const { checkHandler } = require("./handlers/routeHandler/checkHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};

module.exports = routes;
