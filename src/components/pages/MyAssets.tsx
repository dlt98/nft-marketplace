import { useState, useEffect } from "react";
import { MyAssetsProps, NFTtype } from "../../types";
import { Spinner, UserAnnouncement } from "../common";
import { formatBigNumber, formatToEth } from "../../utils";

const MyAssets = ({ marketplace, nft, account }: MyAssetsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState<NFTtype[]>([]);

  useEffect(() => {
    loadMyAssets();
  }, []);

  const loadMyAssets = async () => {
    const data = await marketplace.fetchMyNfts();

    const items: NFTtype[] = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        const res = await fetch(tokenUri);
        const metadata = await res.json();

        //get total price
        const totalPrice = await marketplace.getTotalPrice(i.itemId);

        const item: NFTtype = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return item;
      })
    );

    setIsLoading(false);
    setPurchases(items);
  };

  const sellNFT = async (nftForSale: any) => {
    const price = 42;
    //approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();

    // add nft to marketplace
    const listingPrice = formatToEth(price.toString());

    await (await marketplace.sellItem(nftForSale.itemId, listingPrice)).wait();
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  if (!purchases.length)
    return <UserAnnouncement text="Theres nothing here :(" />;

  return (
    <div className="p-4">
      <h2 className="py-2 text-2xl">Items bought</h2>
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {purchases.map((nft, idx) => {
          return (
            <div className="overflow-hidden border shadow rounded-xl" key={idx}>
              <img
                src={nft.image}
                alt={`nft-${nft.name}`}
                className="rounded"
              />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {formatBigNumber(nft.price!)} Eth
                </p>
              </div>
              <button onClick={() => sellNFT(nft)}>SELL ITEM</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAssets;
