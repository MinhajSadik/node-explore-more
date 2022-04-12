/**
 * Title: Not-Found Handler
 * Description: 404 Not Found Handler for the application
 * Author: Minhaj Sadik
 * Date: 12/04/2022
 */

// Dependencies
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log("requestProperties", requestProperties);
  // response handling
  callback(404, {
    message: "Your requested url wasn't found",
  });
};

module.exports = handler;
