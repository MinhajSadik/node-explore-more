/**
 * Title: User Handler
 * Description: Handler to handle user relelated routes
 * Author: Minhaj Sadik
 * Date: 12/04/2022
 */

// Dependencies
const data = require("../../library/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");

//module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["post", "get", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    // response handling
    callback(405, {
      message: "This is a user url",
    });
  }
};

handler._users = {};
handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

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

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that user doesn't already exist
    data.read("users", phone, (err, user) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // store the user to database
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: "User created successfully",
            });
          } else {
            callback(500, {
              message: "Error couldn't create user",
            });
          }
        });
      } else {
        callback(500, {
          error: "there was a problem in server side",
        });
      }
    });
  } else {
    callback(400, {
      message: "you've a problem in your request",
    });
  }
};

handler._users.get = (requestProperties, callback) => {
  //check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    //lookup the user
    data.read("users", phone, (err, u) => {
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "User not found",
        });
      }
    });
  } else {
    callback(400, {
      error: "requested user wasn't found",
    });
  }
};

handler._users.put = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      //lookup the user
      data.read("users", phone, (err, uData) => {
        const userData = { ...parseJSON(uData) };
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }
          //store the user to database
          data.update("users", phone, userData, (err) => {
            if (!err) {
              callback(200, {
                message: "User updated successfully",
              });
            } else {
              callback(500, {
                message: "Error couldn't update user",
              });
            }
          });
        } else {
          callback(404, {
            error: "You've a problem",
          });
        }
      });
    } else {
      callback(400, {
        error: "you've a problem in your request",
      });
    }
  } else {
    callback(400, {
      error: "invalid phone number, please try again",
    });
  }
};

handler._users.delete = (requestProperties, callback) => {
  // check the phone number is valid
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    //lookup the user
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, {
              message: "User deleted successfully",
            });
          } else {
            callback(500, {
              message: "Error couldn't delete user",
            });
          }
        });
      } else {
        callback(500, {
          error: "there an server side error",
        });
      }
    });
  } else {
    callback(400, {
      error: "there was a problem in your phone number, please try again",
    });
  }
};

module.exports = handler;
