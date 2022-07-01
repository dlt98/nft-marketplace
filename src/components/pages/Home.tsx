import { useEffect, useRef, useState } from "react";
import { NFTtype, PageProps } from "../../types";
import { formatBigNumber, smoothScroll, getAlertOption } from "../../utils";
import {
  Spinner,
  UserAnnouncement,
  NFT,
  NftContainer,
  Button,
  Alert,
} from "../common";
import { ALERT_OPTIONS } from "../../utils";

const Home = ({ nft, marketplace }: PageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<NFTtype[]>([]);
  const [alert, setAlert] = useState({
    visible: false,
    option: ALERT_OPTIONS[0],
    text: "A simple success alert - check it out!",
  });

  const marketRef = useRef<null | HTMLDivElement>(null);

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

  const buyMarketItems = async (item: NFTtype) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();

    loadMarketplaceItems();
    setAlert({
      option: getAlertOption("positive")!,
      text: "Purchase successfull, check the MyAssets page",
      visible: true,
    });
  };

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  return (
    <div className="w-full px-4">
      <div className="px-6 py-24 text-center text-gray-800 bg-gray-50">
        <h1 className="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
          The best place to come <br />
          <span className="text-blue-600">for your NFT needs</span>
        </h1>
        <Button
          text="Go to the marketplace"
          onClick={() => {
            smoothScroll(marketRef);
            setAlert({
              option: getAlertOption("negative")!,
              text: "very bad",
              visible: true,
            });
          }}
        />
      </div>
      <div ref={marketRef}>
        <NftContainer className="mt-5">
          {items.length ? (
            items.map((nft: NFTtype, idx) => (
              <NFT
                name={nft.name}
                description={nft.description}
                image={nft.image}
                price={formatBigNumber(nft.totalPrice)}
                onClick={() => buyMarketItems(nft)}
                collection={"Special collection"}
                buttonText="Buy"
                key={idx}
              />
            ))
          ) : (
            <UserAnnouncement text="Theres nothing here :(" />
          )}
        </NftContainer>
      </div>
      <Alert
        visible={alert.visible}
        setAlert={(bool: boolean) => setAlert({ ...alert, visible: bool })}
        alertOption={alert.option}
        text={alert.text}
      />
    </div>
  );
};

export default Home;
