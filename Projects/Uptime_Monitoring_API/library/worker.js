/**
 * Title: Workers Library
 * Description: Workers Related Functions
 * Author: Minhaj Sadik;
 * Date: 28/04/2022;
 */

// Dependencies
const url = require("url");
const http = require("http");
const https = require("https");
const data = require("./data");
const { parseJSON } = require("../helpers/utilities");
const { sendTwilioSms } = require("../helpers/notifications");

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

worker.performCheck = (originalCheckData) => {
  // prepare the initial check outcome
  let checkOutcome = {
    error: false,
    responseCode: false,
  };

  // Mark the outcome as error: true
  let outcomeSend = false;

  // parse the hostname & full url from original data
  const parsedUrl = url.parse(
    `${originalCheckData.protocol}:// ${originalCheckData.url}`,
    true
  );
  const hostName = parsedUrl.hostname;
  //path gives full url with queryString and pathname gives without queryString
  const path = parsedUrl.path;

  // construct the request
  const requestDetails = {
    protocol: originalCheckData.protocol + ":",
    hostname: hostName,
    method: originalCheckData.method.toUpperCase(),
    path: path,
    timeout: originalCheckData.timeoutSeconds * 1000,
  };

  const protocolToUse = originalCheckData.protocol == "http" ? http : https;

  // start the request
  let req = protocolToUse.request(requestDetails, (res) => {
    //grab the status of the response
    const status = res.statusCode;

    //update the check outcome and pass to the next process
    checkOutcome.responseCode = status;
    if (!outcomeSend) {
      worker.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSend = true;
    }
  });
  req.on("error", (e) => {
    checkOutcome = {
      error: true,
      value: e,
    };
    //update the check outcome and pass to the next process
    if (!outcomeSend) {
      worker.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSend = true;
    }
  });

  req.on("timeout", (e) => {
    checkOutcome = {
      error: true,
      value: "timeout",
    };

    //update the check outcome and pass to the next process
    if (!outcomeSend) {
      worker.processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSend = true;
    }
  });

  // end the request and send
  req.end();
};

//save checkOutcome to the file system database
worker.processCheckOutcome = (originalCheckData, checkOutcome) => {
  //check if checkOutcome is up or down
  let state =
    !checkOutcome.error &&
    checkOutcome.responseCode &&
    originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1
      ? "up"
      : "down";

  //decide whether we should alert the user or not
  let alertWarranted = !!(
    originalCheckData.lastChecked && originalCheckData.state !== state
  );

  // update the check data
  let newCheckData = originalCheckData;
  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  // update the updates
  data.update("checks", newCheckData.id, newCheckData, (err) => {
    if (!err) {
      if (alertWarranted) {
        //send the alert
        worker.alertUserToStatusChange(newCheckData);
      } else {
        console.log("Check outcome has not changed, no alert needed");
      }
    } else {
      console.error("Error trying to update one of the checks");
    }
  });
};

// send notification to the user if state has changed
worker.alertUserToStatusChange = (newCheckData) => {
  const msg = `Alert: Your check for ${newCheckData.method.toUpperCase()} ${
    newCheckData.protocol
  }://${newCheckData.url} is currently ${newCheckData.state}`;

  sendTwilioSms(newCheckData.userPhone, msg, (err) => {
    if (!err) {
      console.log(`User was alerted to a status change via SMS: ${msg}`);
    } else {
      console.log("There was a problem sending sms to one of the user!");
    }
  });
};

// timer to execute the workers process once every minute
worker.loop = () => {
  setInterval(() => {
    worker.getherAllChecks();
  }, 8000);
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
