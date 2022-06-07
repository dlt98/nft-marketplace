import { useState, useEffect } from "react";
import { ethers } from "ethers";

const CreatorDashboard = () => {
  return <div>CreatorDashboard</div>;
  // const [nfts, setNfts] = useState<any[]>([]);
  // const [sold, setSold] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // loadNFTs();
  // }, []);

  // const loadNFTs = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();

  //   console.log("web3Modal", web3Modal);
  //   console.log("connection", connection);

  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();

  //   const marketContract = new ethers.Contract(
  //     nftMarketAddress,
  //     Market.abi,
  //     signer
  //   );
  //   const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);

  //   const data = await marketContract.fetchItemsCreated();

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
  //         sold: i.sold,
  //         image: meta.data.image,
  //       };

  //       return item;
  //     })
  //   );

  //   const soldItems = items.filter((i) => i.sold);

  //   setSold(soldItems);
  //   setNfts(items);
  //   setIsLoading(false);
  // };

  // return (
  //   <div>
  //     <div className="p-4">
  //       <h2 className="py-2 text-2xl">Items Created</h2>
  //       <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
  //         {nfts.map((nft, idx) => (
  //           <div className="overflow-hidden border shadow rounded-xl">
  //             <img src={nft.image} alt={`nft-${idx}`} className="rounded" />
  //             <div className="p-4 bg-black">
  //               <p className="text-2xl font-bold text-white">
  //                 Price - {nft.price} Eth
  //               </p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //     <div className="px-4">
  //       {Boolean(sold.length) && (
  //         <div>
  //           <h2 className="py-2 text-2xl">Items sold</h2>
  //           <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
  //             {sold.map((nft, idx) => (
  //               <div className="overflow-hidden border shadow rounded-xl">
  //                 <img src={nft.image} alt={`nft-${idx}`} className="rounded" />
  //                 <div className="p-4 bg-black">
  //                   <p className="text-2xl font-bold text-white">
  //                     Price - {nft.price} Eth
  //                   </p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default CreatorDashboard;
