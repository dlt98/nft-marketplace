import { useState, useEffect } from "react";
import { CreatorDashboardProps, NFTtype } from "../../types";
import { BigNumberish } from "ethers";
import { Spinner, UserAnnouncement, NFT } from "../common";

const CreatorDashboard = ({
  marketplace,
  nft,
  account,
}: CreatorDashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listedItems, setListedItems] = useState<NFTtype[]>([]);
  const [soldItems, setSoldItems] = useState<NFTtype[]>([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    if (!account) return;

    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Offered(null, null, null, null, account);
    const results = await marketplace.queryFilter(filter);

    const soldItems: NFTtype[] = [];

    //Fetch metadata of each nft and add that to listedItem object
    const listedItems: NFTtype[] = await Promise.all(
      results.map(async (i: any) => {
        //fetch arguments from each result
        i = i.args;

        //get uri url from nft contract
        const uri: string = await nft.tokenURI(i.tokenId);

        //use uri to fetch the nft metadata stored on ipfs
        const res = await fetch(uri);
        const metadata = await res.json();

        //get total price of item (item price + fee)
        const totalPrice: BigNumberish = await marketplace.getTotalPrice(
          i.itemId
        );

        //define listed item object
        const tempItem: NFTtype = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        //Add listen item to sold
        if (i.sold) soldItems.push(tempItem);

        return tempItem;
      })
    );

    setIsLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };
  // const loadNFTs = async () => {
  //   const itemCount = await marketplace.itemCount();
  //   const listedItems: NFTtype[] = [];
  //   const soldItems: NFTtype[] = [];

  //   for (let i = 1; i <= itemCount; i++) {
  //     const item = await marketplace.items(i);

  //     if (item.seller.toLowerCase() === account) {
  //       const uri: string = await nft.tokenURI(item.tokenId);
  //       //use uri to fetch the nft metadata
  //       const res = await fetch(uri);
  //       const metadata = await res.json();

  //       //get total price of item (item price + fee)
  //       const totalPrice: BigNumberish = await marketplace.getTotalPrice(
  //         item.itemId
  //       );

  //       //define listed item object
  //       const tempItem: NFTtype = {
  //         totalPrice,
  //         price: item.price,
  //         itemId: item.itemId,
  //         name: metadata.name,
  //         description: metadata.description,
  //         image: metadata.image,
  //       };

  //       console.log("tempItem", tempItem);

  //       listedItems.push(tempItem);

  //       //Add listen item to sold
  //       if (item.sold) soldItems.push(tempItem);
  //     }

  //     setIsLoading(false);
  //     setListedItems(listedItems);
  //     setSoldItems(soldItems);
  //   }
  // };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  if (!listedItems.length)
    return <UserAnnouncement text="Theres nothing here :(" />;

  return (
    <div className="flex flex-col justify-center">
      <div className="p-4">
        <h3>Listed items</h3>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {listedItems.map((nft, idx) => {
            return (
              <NFT
                description={nft.description}
                image={nft.image}
                name={nft.name}
                price={nft.price!}
                onClick={() => {}}
                key={`name-${idx}`}
              />
            );
          })}
        </div>
      </div>
      <div className="p-4">
        <h3>Sold items</h3>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {soldItems?.map((nft, idx) => (
            <NFT
              description={nft.description}
              image={nft.image}
              name={nft.name}
              price={nft.price!}
              onClick={() => {}}
              key={`name-${idx}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
