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
} from "./components/pages";

import { Container, Sidebar } from "./components/layout/";

import { Headline, Spinner } from "./components/common";
import {
  upperCaseAndSpace,
  saveToStorage,
  getSpecificSettingsFromStorage,
  getProfileImage,
} from "./utils";

import { UserSettings } from "./types";

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Sidebar walletAddress={walletAddress} profileImage={profileImage} />
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
                    text="Home screen"
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
          </Routes>
        )}
      </Container>
    </BrowserRouter>
  );
};

export default App;
