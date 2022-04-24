/**
 * Title: Utilities Functions
 * Description: Important Utilities functions
 */

// Dependencies
const crypto = require("crypto");
const enviroments = require("./enviroment");

// module scaffolding
const utilities = {};

//parse JSON string to object
utilities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

//parse JSON string to object
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", enviroments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

//commonjs module export
module.exports = utilities;
