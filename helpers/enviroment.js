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
};

envirotments.production = {
  httpPort: 3001,
  envName: "production",
  secretKey: "ewrsadfklasdfjlkjasdfljasdf",
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
