import { ethers } from "ethers";
import { useEffect, useState } from "react";
import UserAnnouncement from "../UserAnnouncemnt";

// import MarketplaceAbi from "../scripts/contracts/Marketplace.json";
// import MarketplaceAddress from "../scripts/contracts/Marketplace-address.json";
// import NFTAbi from "../scripts/contracts/NFT.json";
// import NFTAddress from "../scripts/contracts/NFT-address.json";

const Home = () => {
  return <div>HOME</div>;
};
//   const [nfts, setNfts] = useState<any[]>([]);
//   const [marketplace, setMarketplace] = useState<any>({});
//   const [NFT, setNFT] = useState<any>({});

//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setupConnection();
//   });

//   useEffect(() => {
//     loadMarketplaceItems();
//   }, [marketplace]);

//   const setupConnection = () => {
//     //Get the provider from metamask
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     //Set signer
//     const signer = provider.getSigner();

//     loadContracts(signer);
//   };

//   const loadContracts = async (signer) => {
//     //Get deployed copies of contracts
//     const marketplace = new ethers.Contract(
//       MarketplaceAddress.address,
//       MarketplaceAbi.abi,
//       signer
//     );
//     setMarketplace(marketplace);
//     const NFT = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
//     setNFT(NFT);

//     setIsLoading(false);
//   };

//   const loadMarketplaceItems = async () => {
//     const itemCount = await marketplace.itemCount();
//     let nfts = [];
//     for (let i = 0; i < itemCount; i++) {
//       const item = await marketplace.items(i);
//       if (!item.sold) {
//         //get uri from nft contract
//         const uri: string = await NFT.tokenURI(item.tokenId);

//         //use URI to fetch the nft metadata on ipfs
//         const res = await fetch(uri);
//         const metadada = await res.json();

//         //get total price of item (price + fee)
//         const totalPrice: string = await marketplace.getTotalPrice(item.itemId);

//         //add item to array
//         nfts.push({
//           totalPrice,
//           itemId: item.itemId,
//           seller: item.seller,
//           name: metadada.name,
//           description: metadada.description,
//           image: metadada.image,
//         });
//       }
//     }

//     setNfts(nfts);
//   };

//   if (isLoading) {
//     return <UserAnnouncement content="Connecting to Metamask" />;
//   } else if (!nfts.length) {
//     return <UserAnnouncement content="No items in marketplace" />;
//   }

//   return (
//     <div className="flex justify-center">
//       <div className="px-4" style={{ maxWidth: "1600px" }}>
//         <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
//           {nfts.map((nft, idx) => (
//             <div key={idx} className="overflow-hidden border shadow rounded-xl">
//               <img src={nft.image} alt={`nft-${idx}`} />
//               <div className="p-4">
//                 <p
//                   style={{ height: "64px" }}
//                   className="text-2xl font-semibold"
//                 >
//                   {nft.name}
//                 </p>
//                 <div style={{ height: "70px", overflow: "hidden" }}>
//                   <p className="text-gray-400">{nft.description}</p>
//                 </div>
//               </div>
//               <div className="p-4 bg-black">
//                 <p className="text-white text-2xl-mb 4-font-bold">
//                   {nft.price} Matic
//                 </p>
//                 <button
//                   className="w-full px-12 py-2 font-bold text-white bg-pink-500 rounded"
//                   onClick={() => buyNft(nft)}
//                 >
//                   Buy
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Home;
