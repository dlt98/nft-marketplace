import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Marketplace, MarketplaceAddress, NFT, NFTAdress } from "./contracts";
import { AVATAR_URL, PROFILE_OPTIONS } from "./utils/constants";

import {
  Home,
  CreateItem,
  CreatorDashboard,
  MyListedItems,
} from "./components/pages";

import { Container, Sidebar } from "./components/layout/";

import { Spinner } from "./components/common";
import { upperCaseAndSpace } from "./utils";

declare var window: any;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [marketplace, setMarketplace] = useState<ethers.Contract | null>(null);
  const [nft, setNft] = useState<ethers.Contract | null>(null);
  const [profileImage, setprofileImage] = useState<string>("");
  const [profileChoice, setProfileChoice] = useState<any>({
    value: PROFILE_OPTIONS[3],
    label: upperCaseAndSpace(PROFILE_OPTIONS[3]),
  });

  //Metamask get wallet address
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
  };

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

  const getProfileImage = async () => {
    if (!profileChoice.value) return;
    const res = await fetch(
      `${AVATAR_URL}${profileChoice.value}/${walletAddress}.svg`
    );

    setprofileImage(res.url);
  };

  useEffect(() => {
    connectMetamask();
    web3provider();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getProfileImage();
  }, [walletAddress, profileChoice]);

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
              element={<Home marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/create-item"
              element={<CreateItem marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/my-assets"
              element={
                <MyListedItems
                  marketplace={marketplace}
                  nft={nft}
                  account={walletAddress}
                />
              }
            />
            <Route
              path="/creator-dashboard"
              element={
                <CreatorDashboard
                  marketplace={marketplace}
                  nft={nft}
                  account={walletAddress}
                  profileImage={profileImage}
                  profileChoice={profileChoice}
                  setProfileChoice={setProfileChoice}
                />
              }
            />
          </Routes>
        )}
      </Container>
    </BrowserRouter>
  );
};

export default App;
