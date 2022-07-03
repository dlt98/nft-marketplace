const { createCanvas, loadImage } = require("canvas");
const {
  writeToMetadata,
  saveMetaDataSingleFile,
  saveImage,
  generateRandomNumber,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  COLLECTION_DESC,
} = require("./utils");
const {
  startEditionFrom,
  editionSize,
  characterType,
} = require("./layers/config");
const console = require("console");
const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
const ctx = canvas.getContext("2d");

let metadataList = [];
let attributesList = [];
const existingCharacters = [];

const signImage = (_sig) => {
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30pt Verdana";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(_sig, 40, 40);
};

const genColor = () => {
  let hue = generateRandomNumber(360);
  let pastel = `hsl(${hue}, 100%, 75%)`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

const addMetadata = (character, _edition) => {
  const dateTime = Date.now();
  const tempMetadata = {
    id: character.join(""),
    name: `#${_edition}`,
    description: COLLECTION_DESC,
    edition: _edition,
    date: dateTime,
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

const resetCanvas = () => ctx.clearRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

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

const createCharacter = (characterType) => {
  let character = [];
  characterType.layers.forEach((layer) => {
    const randElementNum = generateRandomNumber();
    let num = 0;
    layer.elements.forEach((element) => {
      if (randElementNum >= 100 - element.weight) {
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
      `Created edition: ${nftIndex}, with Characteristics: ${newCharacter}`
    );

    existingCharacters.push(newCharacter);
  }

  writeToMetadata(metadataList);
};

startCreating();
