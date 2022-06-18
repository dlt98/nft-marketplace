import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { IPFS_BASE_URL, IPFS_CONNECTION_URL, PageProps } from "../../utils";

const client = ipfsHttpClient({ url: IPFS_CONNECTION_URL });

const CreateItem = ({ nft, marketplace }: PageProps) => {
  const [image, setImage] = useState<null | string>(null);
  const [price, setPrice] = useState<null | string>(null);
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
        <input
          type="text"
          placeholder="Asset name"
          className="p-4 mt-8 border rounded"
          onChange={(e) => setName(e.target.value.trim())}
        />
        <textarea
          placeholder="Asset description"
          className="p-4 mt-2 border rounded"
          onChange={(e) => setDescription(e.target.value.trim())}
        />
        <input
          type="text"
          placeholder="Asset price in Ethereum"
          className="p-4 mt-2 border rounded"
          onChange={(e) => setPrice(e.target.value.trim())}
        />
        <input
          type="file"
          placeholder="Asset"
          className="my-4"
          onChange={uploadToIpfs}
        />
        {image && <img className="mt-4 rounded" src={image} />}
        <button
          disabled={!checkIfAllInputsFilled()}
          className="p-4 mt-4 font-bold text-white bg-pink-500 rounded shadow-lg"
          onClick={createNFT}
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
};

export default CreateItem;
