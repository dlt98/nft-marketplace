import { useState, useEffect } from "react";
import { CreatorDashboardProps, NFTtype } from "../../types";
import { BigNumberish } from "ethers";
import { Spinner, UserAnnouncement, Headline, NFT } from "../common";
import { UserProfileSection, Tabs } from "../CreatorDashboardComponents/";
import { formatBigNumber } from "../../utils";

const CreatorDashboard = ({
  marketplace,
  nft,
  account,
  profileImage,
  profileChoice,
  setProfileChoice,
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
    const offeredFilter = marketplace.filters.Offered(
      null,
      null,
      null,
      null,
      account
    );
    const boughtFilter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      account,
      null
    );
    const offeredResults = await marketplace.queryFilter(offeredFilter);
    const boughtResults = await marketplace.queryFilter(boughtFilter);

    //Fetch metadata of each nft and add that to listedItem object
    const listedItems: NFTtype[] = await Promise.all(
      offeredResults.map(async (i: any) => {
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
          totalPrice: formatBigNumber(totalPrice),
          price: formatBigNumber(i.price),
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return tempItem;
      })
    );

    const soldItems: NFTtype[] = await Promise.all(
      boughtResults.map(async (i: any) => {
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
          totalPrice: formatBigNumber(totalPrice),
          price: formatBigNumber(i.price),
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return tempItem;
      })
    );

    setIsLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  return (
    <div className="w-full p-4">
      <UserProfileSection
        account={account}
        profileChoice={profileChoice}
        profileImage={profileImage}
        setProfileChoice={setProfileChoice}
      />

      <Tabs
        tabContent1={
          listedItems.length ? (
            listedItems.map((nft, idx) => {
              return (
                <NFT
                  description={nft.description}
                  image={nft.image}
                  name={nft.name}
                  price={nft.price!.toString()}
                  onClick={() => {}}
                  key={`name-${idx}`}
                  collection={"This is a collection"}
                  priceText="Listed price"
                />
              );
            })
          ) : (
            <UserAnnouncement text="Theres nothing here :(" />
          )
        }
        tabContent2={
          soldItems.length ? (
            soldItems.map((nft, idx) => (
              <NFT
                description={nft.description}
                image={nft.image}
                name={nft.name}
                price={nft.price!.toString()}
                onClick={() => {}}
                key={`name-${idx}`}
                collection={"This is a collection"}
                priceText="Listed price"
              />
            ))
          ) : (
            <UserAnnouncement text="Theres nothing here :(" />
          )
        }
      />
    </div>
  );
};

export default CreatorDashboard;
