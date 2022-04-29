/**
 * Title: Sample Handler
 * Description: Sample Handler for the application
 * Author: Minhaj Sadik
 * Date: 12/04/2022
 */

// Dependencies
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log("requestProperties", requestProperties);
  // response handling
  callback(200, {
    message: "This is a sample url",
  });
};

module.exports = handler;
