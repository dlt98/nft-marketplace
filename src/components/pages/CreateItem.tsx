import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

const CreateItem = () => {
  return <div>Create Item</div>;
  // const [fileUrl, setFileUrl] = useState<string | null>(null);
  // const [formInput, setFormInput] = useState({
  //   price: "",
  //   name: "",
  //   description: "",
  // });
  // // const router = useRouter();

  // const onChange = async (e: any) => {
  //   const file = e.target.files[0];
  //   try {
  //     const added = await client.add(file, {
  //       progress: (prog) => console.log(`received ${prog}`),
  //     });
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;

  //     setFileUrl(url);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const createSale = async (url: string) => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);

  //   const signer = provider.getSigner();

  //   let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
  //   let transaction = await contract.createToken(url);

  //   let tx = await transaction.wait();

  //   let event = tx.events[0];
  //   let value = event.args[2];
  //   let tokenId = value.toNumber();

  //   const price = ethers.utils.parseUnits(formInput.price, "ether");

  //   contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);

  //   const listingPrice = (await contract.getListingPrice()).toString();

  //   transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
  //     value: listingPrice,
  //   });

  //   await transaction.wait();

  //   router.push("/");
  // };

  // const createMarketItem = async () => {
  //   const { name, description, price } = formInput;

  //   if (!name || !description || !price || !fileUrl) return;

  //   const data = JSON.stringify({ name, description, image: fileUrl });

  //   try {
  //     const added = await client.add(data);
  //     const url: string = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     /** After the file is uploaded to IPFS, pass the URL to save it on polygon */

  //     createSale(url);
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // };

  // return (
  //   <div className="flex justify-center">
  //     <div className="flex flex-col w-1/2 pb-12">
  //       <input
  //         type="text"
  //         placeholder="Asset name"
  //         className="p-4 mt-8 border rounded"
  //         onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
  //       />
  //       <textarea
  //         placeholder="Asset description"
  //         className="p-4 mt-2 border rounded"
  //         onChange={(e) =>
  //           setFormInput({ ...formInput, description: e.target.value })
  //         }
  //       />
  //       <input
  //         type="text"
  //         placeholder="Asset price in Matic"
  //         className="p-4 mt-2 border rounded"
  //         onChange={(e) =>
  //           setFormInput({ ...formInput, price: e.target.value })
  //         }
  //       />
  //       <input
  //         type="file"
  //         placeholder="Asset"
  //         className="my-4"
  //         onChange={onChange}
  //       />
  //       {fileUrl && <img className="mt-4 rounded" src={fileUrl} />}
  //       <button
  //         className="p-4 mt-4 font-bold text-white bg-pink-500 rounded shadow-lg"
  //         onClick={createMarketItem}
  //       >
  //         Create Digital Asset
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default CreateItem;
