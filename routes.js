/**
 * Title: Routes
 * Description: Routes for the application
 * Author: Minhaj Sadik
 * Date: 12/04/2022
 */

// Dependencies
const { sampleHandler } = require("./handlers/sampleHandler");

const routes = {
  sample: sampleHandler,
};

module.exports = routes;
