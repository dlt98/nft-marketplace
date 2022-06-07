import { useState, useEffect } from "react";
import { ethers } from "ethers";

const MyAssets = () => {
  return <div>MyAssets</div>;
  // const [nfts, setNfts] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // loadNFTs();
  // }, []);

  // const loadNFTs = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();

  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();

  //   const marketContract = new ethers.Contract(
  //     nftMarketAddress,
  //     Market.abi,
  //     signer
  //   );
  //   const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);

  //   console.log("marketContract", marketContract);

  //   const data = await marketContract.fetchMyNfts();

  //   const items = await Promise.all(
  //     data.map(async (i: any) => {
  //       const tokenUri = await tokenContract.tokenURI(i.tokenId);
  //       const meta = await axios.get(tokenUri);
  //       let price = ethers.utils.formatUnits(i.price.toString(), "ether");

  //       console.log("meta", meta);
  //       let item = {
  //         price,
  //         tokenId: i.tokenId.toNumber(),
  //         seller: i.seller,
  //         owner: i.owner,
  //         image: meta.data.image,
  //       };

  //       return item;
  //     })
  //   );

  //   setNfts(items);
  //   setIsLoading(false);
  // };

  // // console.log("isLoading", isLoading);
  // // console.log("nfts", nfts);

  // if (isLoading && !nfts.length) {
  //   return <h1 className="px-20 py-10 text-3xl">No assets owned</h1>;
  // }

  // return (
  //   <div className="flex justify-center">
  //     <div className="p-4">
  //       <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
  //         {nfts.map((nft, idx) => {
  //           console.log("nft", nft);
  //           return (
  //             <div
  //               className="overflow-hidden border shadow rounded-xl"
  //               key={idx}
  //             >
  //               <img src={nft.image} alt={`nft-${idx}`} className="rounded" />
  //               <div className="p-4 bg-black">
  //                 <p className="text-2xl font-bold text-white">
  //                   Price - {nft.price}
  //                 </p>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default MyAssets;
