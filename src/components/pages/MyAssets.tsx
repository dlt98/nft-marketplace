import { useState, useEffect } from "react";
import { MyAssetsProps, NFTtype } from "../../types";
import { Spinner, UserAnnouncement, NFT } from "../common";
import { formatBigNumber } from "../../utils";
import { BigNumberish } from "ethers";

const MyAssets = ({ marketplace, nft, account }: MyAssetsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listedItems, setListedItems] = useState<NFTtype[]>([]);
  const [soldItems, setSoldItems] = useState<NFTtype[]>([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const itemCount = await marketplace.itemCount();
    const listedItems: NFTtype[] = [];
    const soldItems: NFTtype[] = [];

    console.log("LoadNFTS started");
    console.log("itemCount", itemCount);

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);

      if (item.seller.toLowerCase() === account) {
        const uri: string = await nft.tokenURI(item.tokenId);
        //use uri to fetch the nft metadata
        const res = await fetch(uri);
        const metadata = await res.json();

        //get total price of item (item price + fee)
        const totalPrice: BigNumberish = await marketplace.getTotalPrice(
          item.itemId
        );

        //define listed item object
        const tempItem: NFTtype = {
          totalPrice,
          price: item.price,
          itemId: item.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        listedItems.push(tempItem);

        //Add listen item to sold
        if (item.sold) soldItems.push(tempItem);
      }

      setIsLoading(false);
      setListedItems(listedItems);
      setSoldItems(soldItems);
    }
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  if (!listedItems.length)
    return <UserAnnouncement text="Theres nothing here :(" />;

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {listedItems.map((nft, idx) => {
            console.log("nft", nft);
            return (
              <div
                className="overflow-hidden border shadow rounded-xl"
                key={idx}
              >
                <img src={nft.image} alt={`nft-${idx}`} className="rounded" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">
                    Price - {formatBigNumber(nft.price!)}
                  </p>
                </div>
              </div>
            );
          })}
          {soldItems.map((nft, idx) => (
            <NFT
              description={nft.description}
              image={nft.image}
              name={nft.name}
              price={nft.price!}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
