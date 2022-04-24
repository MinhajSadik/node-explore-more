/**
 * Title: Routes
 * Description: Routes for the application
 * Author: Minhaj Sadik
 * Date: 12/04/2022
 */

// Dependencies
const { sampleHandler } = require("./handlers/routeHandler/sampleHandler");
const { userHandler } = require("./handlers/routeHandler/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
