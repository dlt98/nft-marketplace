import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Marketplace, MarketplaceAddress, NFT, NFTAdress } from "./contracts";
import { PROFILE_OPTIONS } from "./utils/constants";

import {
  Home,
  CreateItem,
  CreatorDashboard,
  MyAssets,
  Minting,
} from "./components/pages";

import { Container, Sidebar } from "./components/layout/";

import { Headline, Modal, Spinner } from "./components/common";
import {
  upperCaseAndSpace,
  saveToStorage,
  getSpecificSettingsFromStorage,
  getProfileImage,
  getEthValues,
} from "./utils";

import { UserSettings, EthInfo } from "./types";
import { ethereumIcon } from "./images";

const defaultProfileChoiceValue = {
  value: PROFILE_OPTIONS[3],
  label: upperCaseAndSpace(PROFILE_OPTIONS[3]),
};

declare var window: any;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [marketplace, setMarketplace] = useState<ethers.Contract | null>(null);
  const [nft, setNft] = useState<ethers.Contract | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [profileChoice, setProfileChoice] = useState<any>();
  const [ethInfo, setEthInfo] = useState<EthInfo | null>(null);

  //Metamask get wallet address
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    if (!walletAddress) return;

    const tempProfileChoice =
      getSpecificSettingsFromStorage(walletAddress)?.profileChoice ||
      defaultProfileChoiceValue;

    setProfileChoice(tempProfileChoice);
    getProfileImage(tempProfileChoice.value, walletAddress, setProfileImage);
  }, [walletAddress]);

  useEffect(() => {
    if (!profileChoice) return;
    const userSettings: UserSettings = {
      address: walletAddress,
      profileChoice,
    };

    saveToStorage(walletAddress, userSettings);
    getProfileImage(
      userSettings.profileChoice.value,
      walletAddress,
      setProfileImage
    );
  }, [profileChoice]);

  const web3provider = async () => {
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Get signer
    const signer: ethers.providers.JsonRpcSigner = provider.getSigner();

    loadContracts(signer);
  };

  const loadContracts = async (signer: ethers.providers.JsonRpcSigner) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      Marketplace.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAdress.address, NFT.abi, signer);
    setNft(nft);
    setIsLoading(false);
  };

  useEffect(() => {
    connectMetamask();
    web3provider();
    getEthValues(setEthInfo);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Sidebar
        walletAddress={walletAddress}
        profileImage={profileImage}
        ethPrice={ethInfo?.market_data.current_price.usd}
      />
      <Container>
        {isLoading ? (
          <Spinner label="Awaiting metamask connection..." />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Headline
                    text="NFT Marketplace"
                    description="This is the page where you can buy NFT's that users have created."
                  />
                  <Home marketplace={marketplace} nft={nft} />
                </>
              }
            />
            <Route
              path="/create-item"
              element={
                <>
                  <Headline
                    text="Create New Item"
                    description="This is the page that allows you to create your very own NFT. Fill out the required fields and confirm the transaction in your metamask wallet, and voila!"
                  />
                  <CreateItem marketplace={marketplace} nft={nft} />
                </>
              }
            />
            <Route
              path="/my-assets"
              element={
                <>
                  <Headline
                    text="My digital assets"
                    description="View all your purchased NFT's and place them back on the marketplace if you so chose"
                  />
                  <MyAssets
                    marketplace={marketplace}
                    nft={nft}
                    account={walletAddress}
                  />
                </>
              }
            />
            <Route
              path="/creator-dashboard"
              element={
                <>
                  <Headline
                    text="Creator dashboard"
                    description="Here you can view your listed and sold items, along with setting up some options to customize your experience"
                  />
                  <CreatorDashboard
                    marketplace={marketplace}
                    nft={nft}
                    account={walletAddress}
                    profileImage={profileImage}
                    profileChoice={profileChoice}
                    setProfileChoice={setProfileChoice}
                  />
                </>
              }
            />
            <Route
              path="/minting"
              element={
                <>
                  <Headline
                    text="NFT random mint"
                    description="This is where you will be able to mint an NFT that has been created from differently drawn layers"
                  />
                  <Minting marketplace={marketplace} nft={nft} />
                </>
              }
            />
          </Routes>
        )}
        <Modal name="ethModal" title="Ethereum information">
          <div>
            <div className="flex items-center">
              <img src={ethereumIcon} alt="ethereum icon" className="w-7 h-7" />
              <p className="ml-1 text-2xl font-poppins">Ethereum</p>
            </div>
            <h3 className="my-4 font-poppins">
              The price of Ether is{" "}
              <a
                className="font-bold"
                href="https://www.coingecko.com/en/coins/ethereum"
                target={"_blank"}
                rel="noreferrer"
              >
                {ethInfo?.market_data.current_price.usd}$
              </a>
            </h3>
            <div>
              <h5>Description:</h5>
              <div
                className="font-poppins injected-html"
                dangerouslySetInnerHTML={{ __html: ethInfo?.description.en }}
              />
            </div>
          </div>
        </Modal>
      </Container>
    </BrowserRouter>
  );
};

export default App;
