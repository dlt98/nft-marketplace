import { useRef, useState } from "react";

import { PageProps } from "../../types";
import {
  IPFS_BASE_URL,
  getFirstAvailableArt,
  NFT_MINT_PRICE,
  formatToEth,
  COLLECTION_SIZE,
  getMintedFromStorage,
  saveMintedToStorage,
  client,
} from "../../utils";

import images from "../../images/art-generation-examples";

import MintingButton from "../Minting/MintingButton";

const Minting = ({ marketplace, nft }: PageProps) => {
  const [image, setImage] = useState<string>("");
  const [creatingNft, setCreatingNft] = useState(false);
  const [showNft, setShowNft] = useState(false);
  const mintingNft = useRef(0);

  const uploadToIpfs = async (img: any) => {
    if (!img) return false;
    setCreatingNft(true);

    try {
      const res = await client.add(img);
      console.log(res);
      const ipfsImage = `${IPFS_BASE_URL}${res.path}`;
      setImage(ipfsImage);
      return ipfsImage;
    } catch (error) {
      console.log("There was an issue uploading to ipfs: ", error);
    }
  };

  const successfullMint = () => {
    setShowNft(true);
    setCreatingNft(false);

    const mintedItems = getMintedFromStorage();

    mintedItems.push(mintingNft.current);
    saveMintedToStorage(mintedItems);
  };

  const mint = async (res: any) => {
    if (!res) return;

    const uri = `${IPFS_BASE_URL}${res.path}`;

    //minting nft
    await (await nft.mint(uri)).wait();

    //get tokenId of new nft
    const id = await nft.tokenCount();

    const priceToPay = { value: formatToEth(NFT_MINT_PRICE.toString()) };

    await (await marketplace.randomMint(nft.address, id, priceToPay)).wait();

    successfullMint();
  };

  const createNFT = async (
    image: string,
    name: string,
    description: string
  ) => {
    if (!image || !name || !description) return;

    try {
      const res = await client.add(
        JSON.stringify({ image, name, description })
      );
      mint(res);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintRandomNft = async () => {
    setImage("");
    const imageObj = await getFirstAvailableArt();

    if (!imageObj.image || !imageObj.json) {
      setCreatingNft(false);
      return;
    }

    const ipfsImage = await uploadToIpfs(imageObj.image!);

    if (!ipfsImage) return;

    mintingNft.current = imageObj.json.edition;
    createNFT(ipfsImage, imageObj.json.name, imageObj.json.description);
  };

  return (
    <div className="mt-16">
      <h1 className="mx-auto text-6xl font-light transition-all border-b-2 w-max hover:border-b-4 ">
        Welcome to the land of the Coolios
      </h1>
      <div className="space-y-2 my-11">
        <p className="text-xl text-center text-green-900">
          Minting has already started, so jump in!
        </p>
        <p className="text-2xl text-center">{`${
          getMintedFromStorage().length
        }/${COLLECTION_SIZE}`}</p>
      </div>
      <div className="flex flex-col items-center justify-center my-10 space-y-8">
        <MintingButton
          nftImage={showNft ? image : ""}
          onClick={() => {
            if (creatingNft) return;
            mintRandomNft();
          }}
        />
      </div>
      <p className="mb-4 text-lg text-center ">
        Examples of what you could get are here
      </p>
      <div className="flex justify-between">
        {images.map((item, idx) => (
          <img
            src={item}
            alt={`art-generation-example ${idx}`}
            className="example-pic"
          />
        ))}
      </div>
    </div>
  );
};

export default Minting;
