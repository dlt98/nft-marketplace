import { useState, useEffect } from "react";
import { MyListedItemsProps, NFTtype } from "../../types";
import { Spinner, UserAnnouncement } from "../common";
import { formatBigNumber } from "../../utils";

const MyListedItems = ({ marketplace, nft, account }: MyListedItemsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState<NFTtype[]>([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketplace.queryFilter(filter);

    //Fetch metadata of each nft and add that to listedItem object
    const purchases: NFTtype[] = await Promise.all(
      results.map(async (i: any) => {
        //fetch arguments from each result
        i = i.args;

        //get uri url from nft contract
        const uri: string = await nft.tokenURI(i.tokenId);

        //use uri to fetch the nft metadata stored on ipfs
        const res = await fetch(uri);
        const metadata = await res.json();

        //get total price
        const totalPrice = await marketplace.getTotalPrice(i.itemId);

        const tempItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          nema: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return tempItem;
      })
    );

    setIsLoading(false);
    setPurchases(purchases);
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  if (!purchases.length)
    return <UserAnnouncement text="Theres nothing here :(" />;

  return (
    <div>
      <div className="p-4">
        <h2 className="py-2 text-2xl">Items bought</h2>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {purchases.map((nft, idx) => (
            <div className="overflow-hidden border shadow rounded-xl">
              <img src={nft.image} alt={`nft-${idx}`} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {formatBigNumber(nft.price!)} Eth
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListedItems;
