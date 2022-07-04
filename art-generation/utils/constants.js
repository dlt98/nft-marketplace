const IMAGE_HEIGHT = 1000;
const IMAGE_WIDTH = 1000;

const IMAGE_FORMAT = {
  width: IMAGE_WIDTH,
  height: IMAGE_HEIGHT,
};

const COLLECTION_SIZE = 10;

const COLLECTION_DESC =
  "These are some of the craziest dudes you will ever see. What is that dude wearing?";

const RARITY = [
  { key: "", val: "original", weight: 50 },
  { key: "_r", val: "rare", weight: 10 },
  { key: "_sr", val: "super rare", weight: 1 },
];

const LAYER_ORDER = [
  { name: "body" },
  { name: "clothing" },
  { name: "clothing logo" },
  { name: "eyebrows" },
  { name: "eyes" },
  { name: "eyewear" },
  { name: "headwear" },
  { name: "mouth" },
  { name: "nose" },
];

const LAYERS_DIR = "art-generation/layers";

module.exports = {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  IMAGE_FORMAT,
  COLLECTION_SIZE,
  COLLECTION_DESC,
  RARITY,
  LAYER_ORDER,
  LAYERS_DIR,
};
