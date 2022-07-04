import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState } from "react";

import { PageProps } from "../../types";
import {
  IPFS_CONNECTION_URL,
  IPFS_BASE_URL,
  getFirstAvailableArt,
} from "../../utils";

import { Button } from "../common";

const client = ipfsHttpClient({ url: IPFS_CONNECTION_URL });

const Minting = ({ marketplace, nft }: PageProps) => {
  const [image, setImage] = useState<string>("");
  const [imageUploading, setImageUploading] = useState(false);

  const uploadToIpfs = async (img: any) => {
    if (!img) return false;
    setImageUploading(true);

    try {
      const res = await client.add(img);
      console.log(res);
      setImage(`${IPFS_BASE_URL}${res.path}`);
    } catch (error) {
      console.log("There was an issue uploading to ipfs: ", error);
    }
  };

  const mintRandomNft = async () => {
    const imageObj = await getFirstAvailableArt();

    if (!imageObj.image || !imageObj.json) {
      console.log("Sorry there are no NFT's left to mint");
    }

    console.log("imageObj", imageObj);
    console.log("typeof imageObj.image", typeof imageObj.image);
    // setImage(imageObj.image!);
    await uploadToIpfs(imageObj.image!);
    setImageUploading(false);
  };

  if (imageUploading) return <div>"hold on there buddy";</div>;

  console.log("image", image);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
      <img src={image} alt="Newly minted NFT" className="w-96" />
      <Button text="Mint random NFT" onClick={mintRandomNft} />
    </div>
  );
};

export default Minting;
