import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { IPFS_BASE_URL, IPFS_CONNECTION_URL } from "../../utils";
import { PageProps } from "../../types";
import { FileInput, Input, TextArea } from "../CreateItem";
import { Label, Headline } from "../common";

const client = ipfsHttpClient({ url: IPFS_CONNECTION_URL });

const CreateItem = ({ nft, marketplace }: PageProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const checkIfAllInputsFilled = (): boolean =>
    !!image && !!price && !!name && !!description;

  const uploadToIpfs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0];
    if (typeof file !== "undefined") {
      try {
        const res = await client.add(file);
        console.log(res);
        setImage(`${IPFS_BASE_URL}${res.path}`);
      } catch (error) {
        console.log("There was an issue uploading to ipfs: ", error);
      }
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;

    try {
      const res = await client.add(
        JSON.stringify({ image, name, description })
      );
      mintAndList(res);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintAndList = async (res: any) => {
    if (!image && !price && !name && !description) return;

    const uri = `${IPFS_BASE_URL}${res.path}`;

    //minting nft
    await (await nft.mint(uri)).wait();

    //get tokenId of new nft
    const id = await nft.tokenCount();

    //approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();

    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price!.toString());

    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/2 pb-12">
        <Headline
          description="This is the page that allows you to create your very own NFT. Fill out the required fields and confirm the transaction in your metamask wallet, and voila!"
          text="Create New Item"
        />
        <h4 className="mb-5 text-sm text-gray-500 font-poppins">
          <span className="mr-1 text-red-600">*</span>
          Required fields
        </h4>
        <>
          <Label
            title="Image, Video, Audio, or 3D Model"
            description="File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB"
            required
          />
          <FileInput onChange={uploadToIpfs} image={image} />
        </>
        <>
          <Label
            title="Name"
            description="This is the name of your NFT"
            required
          />
          <Input
            name="Asset name"
            onChange={(e) => setName(e.target.value.trim())}
            placeholder="Asset name"
            type="text"
          />
        </>
        <>
          <Label
            title="Description"
            description="The description will be included on the item's card view."
            required
          />
          <TextArea
            placeholder="Provide a detailed description of your item."
            onChange={(e) => setDescription(e.target.value.trim())}
            name="Description"
            type="text"
          />
        </>
        <>
          <Label
            title="Price"
            description="The amount users you ask for your NFT, the currency is ETH"
            required
          />
          <Input
            name="Asset price"
            onChange={(e) => {
              const value = parseFloat(e.target.value.trim());
              setPrice(isNaN(value) ? "" : value.toString());
            }}
            placeholder="Asset price"
            type="number"
          />
        </>

        <button
          type="button"
          onClick={createNFT}
          className={
            checkIfAllInputsFilled() ? "activated-btn" : "disabled-btn"
          }
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Primary
        </button>
      </div>
    </div>
  );
};

export default CreateItem;
