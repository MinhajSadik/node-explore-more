/**
 * Title: Environments Variables
 * Description: Handle Enviroments Variables
 */

// Dependencies

// module scaffolding
const envirotments = {};

envirotments.staging = {
  httpPort: 3000,
  envName: "staging",
  secretKey: "sadlfjlsadfjlkjlaskdf",
  maxChecks: 5,
  twilio: {
    fromPhone: "+15005550006",
    accountSid: "ACb32d411ad7fe886aac54c665d25e5c5d",
    authToken: "9455e3eb3109edc12e3d8c92768f7a67",
  },
};

envirotments.production = {
  httpPort: 3001,
  envName: "production",
  secretKey: "ewrsadfklasdfjlkjasdfljasdf",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
  },
};

//deternmine which enviroment was passed as a command line argument
const currentEnviroment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export correponding enviroment object
const enviromentToExport =
  typeof envirotments[currentEnviroment] === "object"
    ? envirotments[currentEnviroment]
    : envirotments.staging;

module.exports = enviromentToExport;
