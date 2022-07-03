const { COLLECTION_SIZE, layersSetup } = require("../utils");
const startEditionFrom = 1;

const editionSize = COLLECTION_SIZE;

const characterType = {
  name: "Nerd",
  layers: layersSetup(),
};

module.exports = {
  editionSize,
  startEditionFrom,
  characterType,
};
