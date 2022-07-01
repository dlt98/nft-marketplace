import { useState, useEffect } from "react";
import { AlertState, MyAssetsProps, NFTtype } from "../../types";
import {
  Label,
  NFT,
  NftContainer,
  OffCanvas,
  Spinner,
  UserAnnouncement,
  WideButton,
  Input,
  Alert,
} from "../common";
import {
  ALERT_OPTIONS,
  formatBigNumber,
  formatToEth,
  getAlertOption,
} from "../../utils";

const MyAssets = ({ marketplace, nft, account }: MyAssetsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState<NFTtype[]>([]);
  const [selectedNft, setSelectedNft] = useState<NFTtype | null>(null);
  const [price, setPrice] = useState("");
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    option: ALERT_OPTIONS[0],
    text: "A simple success alert - check it out!",
  });

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

  const sellNFT = async (nftForSale: any, price: string) => {
    if (!price) return;

    //approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();

    // add nft to marketplace
    const listingPrice = formatToEth(price.toString());

    await (await marketplace.sellItem(nftForSale.itemId, listingPrice)).wait();
    loadMyAssets();
    setAlert({
      option: getAlertOption("positive")!,
      text: "Purchase successfull, check the MyAssets page",
      visible: true,
    });
  };

  const isSellConditionMet = (): boolean => !!price;

  if (isLoading) return <Spinner label="Loading marketplace items..." />;

  return (
    <div className="p-4">
      <h2 className="py-2 text-2xl">Items bought</h2>
      {purchases.length ? (
        <NftContainer>
          {purchases.map((nft, idx) => (
            <NFT
              name={nft.name}
              description={nft.description}
              image={nft.image}
              price={formatBigNumber(nft.totalPrice)}
              onClick={() => setSelectedNft(nft)}
              collection={"Special collection"}
              buttonText="Sell"
              priceText="Price you paid"
              key={idx}
            />
          ))}
        </NftContainer>
      ) : (
        <UserAnnouncement text="Theres nothing here :(" />
      )}

      <OffCanvas title="What price do you want to sell this item for?">
        <div className="w-full">
          <img
            src={selectedNft?.image}
            alt="nft pic"
            className="max-w-sm p-3 text-center border-4 border-green-300 rounded-xl"
          />
          <Label
            title="Price"
            description="The amount users do ask for your NFT, the currency is ETH"
            required
          />
          <Input
            name="Asset price"
            onChange={(e: any) => {
              const value = parseFloat(e.target.value.trim());

              setPrice(isNaN(value) ? "" : value.toString());
            }}
            placeholder="Asset price"
            type="number"
          />
          <WideButton
            buttonText="Sell NFT"
            onClick={() => sellNFT(selectedNft, price)}
            disabled={isSellConditionMet()}
          />
        </div>
      </OffCanvas>
      <Alert
        visible={alert.visible}
        setAlert={(bool: boolean) => setAlert({ ...alert, visible: bool })}
        alertOption={alert.option}
        text={alert.text}
      />
    </div>
  );
};

export default MyAssets;
