import { useEffect, useState } from "react";
import { NFTtype, PageProps } from "../../types";
import { formatBigNumber } from "../../utils";
import { Spinner, UserAnnouncement, NewNft, NftContainer } from "../common";

const Home = ({ nft, marketplace }: PageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<NFTtype[]>([]);

  const loadMarketplaceItems = async () => {
    const itemCount: number = await marketplace.itemCount();

    let tempItems: NFTtype[] = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        //get uri from nft contract
        const uri = await nft.tokenURI(item.tokenId);

        //use uri to fetch the nft metadata store on ipfs
        const res = await fetch(uri);

        const metadata = await res.json();
        //get total price of item (item price + fee)
        const totalPrice: string = await marketplace.getTotalPrice(item.itemId);

        tempItems.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }

    setItems(tempItems);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const buyMarketItems = async (item: any) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();

    loadMarketplaceItems();
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  if (!items.length) return <UserAnnouncement text="Theres nothing here :(" />;

  return (
    <div className="w-full px-4">
      <NftContainer>
        {items.map((nft, idx) => (
          <NewNft
            name={nft.name}
            description={nft.description}
            image={nft.image}
            price={formatBigNumber(nft.totalPrice)}
            onClick={() => buyMarketItems(nft)}
            collection={"Special collection"}
            key={idx}
          />
        ))}
      </NftContainer>
    </div>
  );
};

export default Home;
