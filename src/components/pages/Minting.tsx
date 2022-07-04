import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState } from "react";

import { PageProps } from "../../types";
import {
  IPFS_CONNECTION_URL,
  IPFS_BASE_URL,
  getFirstAvailableArt,
  NFT_MINT_PRICE,
  formatToEth,
} from "../../utils";

import { Button } from "../common";

const client = ipfsHttpClient({ url: IPFS_CONNECTION_URL });

const Minting = ({ marketplace, nft }: PageProps) => {
  const [image, setImage] = useState<string>("");
  const [creatingNft, setCreatingNft] = useState(false);
  const [showNft, setShowNft] = useState(false);

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

  const mint = async (res: any) => {
    if (!res) return;

    const uri = `${IPFS_BASE_URL}${res.path}`;

    //minting nft
    await (await nft.mint(uri)).wait();

    //get tokenId of new nft
    const id = await nft.tokenCount();

    const priceToPay = { value: formatToEth(NFT_MINT_PRICE.toString()) };

    await (await marketplace.randomMint(nft.address, id, priceToPay)).wait();

    setShowNft(true);
    setCreatingNft(false);
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

    createNFT(ipfsImage, imageObj.json.name, imageObj.json.description);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
      {!!showNft && <img src={image} alt="Newly minted NFT" className="w-96" />}
      {!creatingNft && (
        <Button text="Mint random NFT" onClick={mintRandomNft} />
      )}
    </div>
  );
};

export default Minting;
