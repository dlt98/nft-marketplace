const fileFunctions = require("./file_functions");
const constants = require("./constants");
const configFunctions = require("./configFunctions");

const generateRandomNumber = (max = 100) => Math.floor(Math.random() * max) + 1;

module.exports = {
  ...fileFunctions,
  ...constants,
  ...configFunctions,
  generateRandomNumber,
};
