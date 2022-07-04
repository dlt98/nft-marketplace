const fs = require("fs");
const dir = "public/images/generated-images";

const writeToMetadata = (json) =>
  fs.writeFileSync(`${dir}/_metadata.json`, JSON.stringify(json));

const saveMetaDataSingleFile = (editionCount, metadataList) => {
  fs.writeFileSync(
    `${dir}/${editionCount}.json`,
    JSON.stringify(metadataList.find((meta) => meta.edition === editionCount))
  );
};

const saveImage = (editionCount, canvas) => {
  fs.writeFileSync(`${dir}/${editionCount}.png`, canvas.toBuffer("image/png"));
};

module.exports = { writeToMetadata, saveMetaDataSingleFile, saveImage };
