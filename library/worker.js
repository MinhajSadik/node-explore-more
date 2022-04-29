/**
 * Title: Workers Library
 * Description: Workers Related Functions
 * Author: Minhaj Sadik;
 * Date: 28/04/2022;
 */

// Dependencies
const url = require("url");
const data = require("./data");
const { parseJSON } = require("../helpers/utilities");

// worker object - module scaffolding
const worker = {};

// lookup all checks, get their data, send to the checker
worker.getherAllChecks = () => {
  //get all the checks from the file system database
  data.list("checks", (err, checks) => {
    if (!err && checks && checks.length > 0) {
      checks.forEach((check) => {
        // read the check data
        data.read("checks", check, (err, originalCheckData) => {
          if (!err && originalCheckData) {
            // pass the check data to the checker
            worker.validateCheckData(parseJSON(originalCheckData));
          } else {
            console.log("Error reading one of the checks");
          }
        });
      });
    } else {
      console.log("Error: Could not find any checks to process");
    }
  });
};

//validate individual check data
worker.validateCheckData = (originalCheckData) => {
  const originalData = originalCheckData;
  if (originalCheckData && originalCheckData.id) {
    originalData.state =
      typeof originalCheckData.state == "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";

    originalData.lastChecked =
      typeof originalCheckData.lastChecked == "number" &&
      originalCheckData.lastChecked > 0
        ? originalCheckData.lastChecked
        : 0;

    // pass to the next process
    worker.performCheck(originalData);
  } else {
    console.log("Error: check was invalid and not properly formatted");
  }
};

// worker.performCheck = (originalCheckData) => {
//   // parse the hostname & full url from original data
//   const parsedUrl = url.parse(
//     `${originalCheckData.protocol}:// ${originalCheckData.url}`,
//     true
//   );
//   const hostName = parsedUrl.hostname;
//   //path gives full url with queryString and pathname gives without queryString
//   const path = parsedUrl.path;

//   // construct the request
// };

// timer to execute the workers process once every minute
worker.loop = () => {
  setInterval(() => {
    worker.getherAllChecks();
  }, 1000 * 60);
};

// start server
worker.init = () => {
  // execute every checks
  worker.getherAllChecks();

  //call the loop so that checks continue to execute
  worker.loop();
};

// export module
module.exports = worker;
