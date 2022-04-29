/**
 * Title: Notification Library
 * Description: Important functions to notify user
 * Author: Minhaj Sadik;
 * Date: 27/04/2022;
 */

// Dependencies
const https = require("https");
const { twilio } = require("./environment");
const querystring = require("querystring");

//module scaffolding
const notifications = {};

//send SMS to user via Twilio API
notifications.sendTwilioSms = (phone, msg, callback) => {
  //input validation
  const userPhone =
    typeof phone === "string" && phone.trim().length === 11
      ? phone.trim()
      : false;
  const userMsg =
    typeof msg === "string" &&
    msg.trim().length > 0 &&
    msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (userPhone && userMsg) {
    //cofigure the request payload
    const payload = {
      From: twilio.fromPhone,
      To: `+88${userPhone}`,
      Body: userMsg,
    };

    //stringify the payload
    const stringifyPayload = querystring.stringify(payload);

    //configure the request details
    const requestDetails = {
      hostName: "api.twilio.com",
      method: "POST",
      path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
      auth: `${twilio.accountSid}:${twilio.authToken}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringifyPayload),
      },
    };

    //instantiate the request object
    const req = https.request(requestDetails, (res) => {
      //grab the status of the sent request
      const status = res.statusCode;
      //callback successfully if the request went through
      if (status === 200 || status === 201) {
        callback(false);
      } else {
        callback(`Status code returned was ${status}`);
      }
    });

    //bind to the error event so it doesn't get thrown
    req.on("error", (e) => {
      callback(e);
    });

    //add the payload
    req.write(stringifyPayload);
    //end the request
    req.end();
  } else {
    callback("Given Parameters are not valid");
  }
};

//export module
module.exports = notifications;
