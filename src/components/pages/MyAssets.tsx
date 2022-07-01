import { useState, useEffect } from "react";
import { MyAssetsProps, NFTtype } from "../../types";
import { NFT, NftContainer, Spinner, UserAnnouncement } from "../common";
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
    loadMyAssets();
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  if (!purchases.length)
    return <UserAnnouncement text="Theres nothing here :(" />;

  return (
    <div className="p-4">
      <h2 className="py-2 text-2xl">Items bought</h2>
      <NftContainer>
        {purchases.map((nft, idx) => (
          <NFT
            name={nft.name}
            description={nft.description}
            image={nft.image}
            price={formatBigNumber(nft.totalPrice)}
            onClick={() => sellNFT(nft)}
            collection={"Special collection"}
            buttonText="Sell"
            key={idx}
          />
        ))}
      </NftContainer>
    </div>
  );
};

export default MyAssets;
