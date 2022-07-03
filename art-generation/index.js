const console = require("console");
const {
  writeToMetadata,
  saveMetaDataSingleFile,
  saveImage,
  generateRandomNumber,
  COLLECTION_DESC,
} = require("./utils");

const {
  canvas,
  ctx,
  loadImage,
  resetCanvas,
  drawBackground,
  signImage,
} = require("./utils/canvas");

const {
  startEditionFrom,
  editionSize,
  characterType,
} = require("./layers/config");

let metadataList = [];
let attributesList = [];
const existingCharacters = [];

const addMetadata = (character, nftNum) => {
  const tempMetadata = {
    id: character.join(""),
    name: `#${nftNum}`,
    description: COLLECTION_DESC,
    edition: nftNum,
    date: Date.now(),
    attributes: attributesList,
  };

  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (el) => {
  let selectedElement = el.layer.selectedElement;
  attributesList.push({
    trait_type: el.layer.name,
    value: selectedElement.name,
  });
};

const loadLayerImg = async (layer) => {
  const image = await loadImage(`${layer.selectedElement.path}`);
  return { layer: layer, loadedImage: image };
};

const drawElement = (el) => {
  ctx.drawImage(
    el.loadedImage,
    el.layer.position.x,
    el.layer.position.y,
    el.layer.size.width,
    el.layer.size.height
  );
  addAttributes(el);
};

const drawImage = (layers, id) => {
  drawBackground();
  layers.forEach((el) => drawElement(el));
  signImage(`#${id}`);
};

//Creates an object containing information about the layer
const createLayerInfo = (character = []) =>
  characterType.layers.map((layer, idx) => {
    const selectedElement = layer.elements.find((e) => e.id === character[idx]);

    return {
      name: layer.name,
      position: layer.position,
      size: layer.size,
      selectedElement: selectedElement,
    };
  });

const isCharacterUnique = (character = []) =>
  !existingCharacters.find((i) => i.join("") === character.join(""));

const getWeightSum = (array) =>
  array.reduce((prevVal, currVal) => prevVal + currVal.weight, 0);

const createCharacter = (characterType) => {
  let character = [];
  characterType.layers.forEach((layer) => {
    const weightSum = getWeightSum(layer.elements); //Used to calculate weight of traits
    const randElementNum = generateRandomNumber(weightSum);

    let num = 0;
    layer.elements.forEach((element) => {
      //Looping through all the elements weights to see which one will be randomly picked
      //The hundred is there because of the total weights
      if (randElementNum >= weightSum - element.weight) {
        num = element.id;
      }
    });
    character.push(num);
  });
  return character;
};

const startCreating = async () => {
  writeToMetadata("");

  for (let nftIndex = startEditionFrom; nftIndex <= editionSize; nftIndex++) {
    const newCharacter = createCharacter(characterType);

    if (!isCharacterUnique(newCharacter)) {
      console.log("Character with these characteristics already exists");
      nftIndex--;
      continue;
    }

    const results = createLayerInfo(newCharacter);
    const loadedElements = results.map((layer) => loadLayerImg(layer));

    const layers = await Promise.all(loadedElements);

    resetCanvas();
    drawImage(layers, nftIndex);

    saveImage(nftIndex, canvas);
    addMetadata(newCharacter, nftIndex);
    saveMetaDataSingleFile(nftIndex, metadataList);
    console.log(
      `Character num: ${nftIndex}, with Characteristics: ${newCharacter}`
    );

    existingCharacters.push(newCharacter);
  }

  writeToMetadata(metadataList);
};

startCreating();
