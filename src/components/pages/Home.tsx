import { useEffect, useState } from "react";
import { NFTtype, PageProps } from "../../utils";
import { Spinner, NFT, UserAnnouncement } from "../common";

const Home = ({ nft, marketplace }: PageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<NFTtype[]>([]);

  const loadMarketplaceItems = async () => {
    const itemCount = await marketplace.itemCount();

    let tempItems: NFTtype[] = [];
    console.log("itemCount", itemCount);
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        //get uri from nft contract
        const uri = await nft.tokenURI(item.tokenId);

        console.log("uri", uri);

        //use uri to fetch the nft metadata store on ipfs
        const res = await fetch(uri, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });

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
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((nft, idx) => (
            <NFT
              name={nft.name}
              description={nft.description}
              image={nft.image}
              price={nft.totalPrice}
              onClick={() => buyMarketItems(nft)}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
