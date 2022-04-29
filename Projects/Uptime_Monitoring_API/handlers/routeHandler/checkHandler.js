/**
 * Title: Check Handler
 * Description: Handler to handle User Define Check
 * Author: Minhaj Sadik
 * Date: 26/04/2022
 */

// Dependencies
const data = require("../../library/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON, createRandomString } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/environment");

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
handler._check.post = (requestProperties, callback) => {
  //validate the input>
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;
  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    let token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;

    //lookup the user phone by reading the token
    data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        let userPhone = parseJSON(tokenData).phone;
        //lookup the user data
        data.read("users", userPhone, (err, userData) => {
          if (!err && userData) {
            tokenHandler._token.verifyToken(
              token,
              userPhone,
              (tokenIsValid) => {
                if (tokenIsValid) {
                  let userObject = parseJSON(userData);
                  let userChecks =
                    typeof userObject.checks === "object" &&
                    userObject.checks instanceof Array
                      ? userObject.checks
                      : [];

                  //check if the user already have a check
                  if (userChecks.length < maxChecks) {
                    let checkId = createRandomString(20);
                    let checkObject = {
                      id: checkId,
                      userPhone,
                      protocol,
                      url,
                      method,
                      successCodes,
                      timeoutSeconds,
                    };
                    //save the obejct
                    data.create("checks", checkId, checkObject, (err) => {
                      if (!err) {
                        // add check id to the user's obejct
                        userObject.checks = userChecks;
                        userObject.checks.push(checkId);

                        //save the new user data
                        data.update("users", userPhone, userObject, (err) => {
                          if (!err) {
                            //return the data about the new check
                            callback(200, checkObject);
                          } else {
                            callback(500, {
                              Error:
                                "Could not update the user with the new check",
                            });
                          }
                        });
                      } else {
                        callback(500, {
                          message: "Could not create the check",
                        });
                      }
                    });
                  } else {
                    callback(401, {
                      error: "user already have the maximum number of checks",
                    });
                  }
                } else {
                  callback(400, {
                    message: "The provided token is invalid",
                  });
                }
              }
            );
          } else {
            callback(400, {
              message: "The provided token is invalid",
            });
          }
        });
      } else {
        callback(400, {
          message: "The provided token is invalid",
        });
      }
    });
  } else {
    callback(400, {
      message: "Missing required fields",
    });
  }
};

handler._check.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    data.read("checks", id, (err, checkData) => {
      if (!err && checkData) {
        let token =
          typeof requestProperties.headersObject.token === "string"
            ? requestProperties.headersObject.token
            : false;
        tokenHandler._token.verifyToken(
          token,
          parseJSON(checkData).userPhone,
          (tokenIsValid) => {
            if (tokenIsValid) {
              callback(200, parseJSON(checkData));
            } else {
              callback(403, {
                message: "The provided token is invalid",
              });
            }
          }
        );
      } else {
        callback(500, {
          error: "Could not fetch the check data",
        });
      }
    });
  } else {
    callback(400, {
      error: "you've the problem in your request",
    });
  }
};

handler._check.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;
  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      data.read("checks", id, (err, checkData) => {
        if (!err && checkData) {
          const checkObject = parseJSON(checkData);
          const token =
            typeof requestProperties.headersObject.token === "string"
              ? requestProperties.headersObject.token
              : false;

          tokenHandler._token.verifyToken(
            token,
            checkObject.userPhone,
            (tokenIsValid) => {
              if (tokenIsValid) {
                if (protocol) {
                  checkObject.protocol = protocol;
                }
                if (url) {
                  checkObject.url = url;
                }
                if (method) {
                  checkObject.method = method;
                }
                if (successCodes) {
                  checkObject.successCodes = successCodes;
                }
                if (timeoutSeconds) {
                  checkObject.timeoutSeconds = timeoutSeconds;
                }
                //store the checkObject
                data.update("checks", id, checkObject, (err) => {
                  if (!err) {
                    callback(200);
                  } else {
                    callback(500, {
                      error: "Could not update the check",
                    });
                  }
                });
              } else {
                callback(403, {
                  message: "The provided token is invalid",
                });
              }
            }
          );
        } else {
          callback(500, {
            message: "the check with the specified id does not exist",
          });
        }
      });
    } else {
      callback(400, {
        error: "you've the problem in your request",
      });
    }
  } else {
    callback(400, {
      error: "Missing required field",
    });
  }
};

//@TODO: authentication
handler._check.delete = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    data.read("checks", id, (err, checkData) => {
      if (!err && checkData) {
        let token =
          typeof requestProperties.headersObject.token === "string"
            ? requestProperties.headersObject.token
            : false;
        tokenHandler._token.verifyToken(
          token,
          parseJSON(checkData).userPhone,
          (tokenIsValid) => {
            if (tokenIsValid) {
              //delete the checks data
              data.delete("checks", id, (err) => {
                if (!err) {
                  data.read(
                    "users",
                    parseJSON(checkData).userPhone,
                    (err, userData) => {
                      if (!err && userData) {
                        const userObject = parseJSON(userData);
                        let userChecks =
                          typeof userObject.checks === "object" &&
                          userObject.checks instanceof Array
                            ? userObject.checks
                            : [];
                        //remove the deleted check id from users list of checks
                        let checkPosition = userChecks.indexOf(id);
                        if (checkPosition > -1) {
                          userChecks.splice(checkPosition, 1);
                          //store the userObject
                          data.update(
                            "users",
                            userObject.userPhone,
                            userObject,
                            (err) => {
                              if (!err) {
                                callback(200);
                              } else {
                                callback(500, {
                                  error: "Could not update the user",
                                });
                              }
                            }
                          );
                        }
                      } else {
                        callback(500, {
                          error: "Could not delete the check",
                        });
                      }
                    }
                  );
                } else {
                  callback(500, {
                    error: "Could not delete the check",
                  });
                }
              });
            } else {
              callback(403, {
                message: "The provided token is invalid",
              });
            }
          }
        );
      } else {
        callback(500, {
          error: "Could not fetch the check data",
        });
      }
    });
  } else {
    callback(400, {
      error: "you've the problem in your request",
    });
  }
};

module.exports = handler;
