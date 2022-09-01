const { createCanvas, loadImage } = require("canvas");
const { IMAGE_HEIGHT, IMAGE_WIDTH, generateRandomNumber } = require("./index");

const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);

const ctx = canvas.getContext("2d");

const signImage = (_sig) => {
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30pt Roboto";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(_sig, 40, 40);
};

const genColor = () => {
  const hue = generateRandomNumber(360);
  return `hsl(${hue}, 100%, 75%)`;
};

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

const resetCanvas = () => ctx.clearRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

module.exports = {
  canvas,
  ctx,
  loadImage,
  resetCanvas,
  drawBackground,
  signImage,
};
