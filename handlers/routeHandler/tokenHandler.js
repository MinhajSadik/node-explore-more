/**
 * Title: Token Handler
 * Description: Handler to handle Token relelated routes
 * Author: Minhaj Sadik
 * Date: 25/04/2022
 */

// Dependencies
const data = require("../../library/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const { createRandomString } = require("../../helpers/utilities");

//module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethods = ["post", "get", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, {
      message: "Method not allowed",
    });
  }
};

handler._token = {};
//@TODO: add token handler
handler._token.post = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone && password) {
    data.read("users", phone, (err, userData) => {
      let hashedPassword = hash(password);
      if (hashedPassword === parseJSON(userData).password) {
        let tokenId = createRandomString(20);
        let expires = Date.now() + 1000 * 60 * 60;
        let tokenObject = {
          phone,
          id: tokenId,
          expires,
        };
        data.create("tokens", tokenId, tokenObject, (err) => {
          if (!err) {
            callback(200, tokenObject);
          } else {
            callback(500, {
              message: "Could not create token",
            });
          }
        });
      } else {
        callback(400, {
          message: "Password is incorrect",
        });
      }
    });
  } else {
    callback(400, {
      message: "You've a problem in your request",
    });
  }
};

handler._token.get = (requestProperties, callback) => {
  //check the id if valid
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    data.read("tokens", id, (err, tokenData) => {
      const token = { ...parseJSON(tokenData) };
      if (!err && token) {
        callback(200, parseJSON(tokenData));
      } else {
        callback(404, {
          errorMsg: "Token not found",
        });
      }
    });
  } else {
    callback(400, {
      errorMsg: "You've a problem in your request",
    });
  }
};

//@TODO: add token handler
handler._token.put = (requestProperties, callback) => {};

//@TODO: add token handler
handler._token.delete = (requestProperties, callback) => {};

module.exports = handler;
