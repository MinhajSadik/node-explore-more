/**
 * Title: Check Handler
 * Description: Handler to handle User Define Check
 * Author: Minhaj Sadik
 * Date: 26/04/2022
 */

// Dependencies
const data = require("../../library/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
//module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["post", "get", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    // response handling
    callback(405, {
      message: "Method not allowed",
    });
  }
};

handler._check = {};
handler._check.post = (requestProperties, callback) => {};

handler._check.get = (requestProperties, callback) => {};

handler._check.put = (requestProperties, callback) => {};

//@TODO: authentication
handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;
