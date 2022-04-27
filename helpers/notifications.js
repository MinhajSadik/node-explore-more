/**
 * Title: Notification Library
 * Description: Important functions to notify user
 * Author: Minhaj Sadik;
 * Date: 27/04/2022;
 */

// Dependencies
const https = require("https");
const { twilio } = require("./helpers/environment");
const querystring = require("querystring");

//module scaffolding
const notifications = {};

//send SMS to user via Twilio API
notifications.sendSMS = (phone, msg, callback) => {
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
    };
  } else {
    callback("Given Parameters are not valid");
  }
};

//export module
module.exports = notifications;
