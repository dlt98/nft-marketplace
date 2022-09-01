const fs = require("fs");

const {
  RARITY,
  LAYER_ORDER,
  LAYERS_DIR,
  IMAGE_FORMAT,
} = require("./constants");

const cleanName = (_str) => {
  let name = _str.slice(0, -4);
  RARITY.forEach((r) => {
    name = name.replace(r.key, "");
  });

  return name;
};

const getRarity = (fileName) => RARITY.find((r) => fileName.includes(r.key));

const getElements = (path) =>
  fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^/.]/g.test(item))
    .map((item, idx) => {
      const rarity = getRarity(item);
      return {
        id: idx,
        name: cleanName(item),
        path: `${path}/${item}`,
        rarity: rarity.val,
        weight: rarity.weight,
      };
    });

const layersSetup = () => {
  const layers = LAYER_ORDER.map((layerObj, idx) => ({
    id: idx,
    name: layerObj.name,
    location: `${LAYERS_DIR}/${layerObj.name}/`,
    elements: getElements(`${LAYERS_DIR}/${layerObj.name}/`),
    position: { x: 0, y: 0 },
    size: IMAGE_FORMAT,
  }));

  return layers;
};

module.exports = { layersSetup };
