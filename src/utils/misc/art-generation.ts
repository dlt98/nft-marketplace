import { COLLECTION_SIZE } from "../constants";
import { getMintedFromStorage, saveMintedToStorage } from "./Storage";

const imagesDir = "/images/generated-images";

export const mintedNfts: number[] = getMintedFromStorage();

const getImageJson = async (id: number) =>
  await fetch(`${imagesDir}/${id}.json`);

const getImage = async (id: number) => {
  const blob = await fetch(`${imagesDir}/${id}.png`).then((res) => res.blob());

  const f = new File([blob], "image.png", { type: "image/png" });

  return f;
};

export const getFirstAvailableArt = async () => {
  const necessaryFiles: any = {
    json: null,
    image: null,
  };

  for (let i = 1; i <= COLLECTION_SIZE; i++) {
    if (!mintedNfts.includes(i)) {
      mintedNfts.push(i);
      saveMintedToStorage(mintedNfts);
      necessaryFiles.json = await getImageJson(i);
      necessaryFiles.image = await getImage(i);
      break;
    }
  }

  return necessaryFiles;
};
