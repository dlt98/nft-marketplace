import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Marketplace, MarketplaceAddress, NFT, NFTAdress } from "./contracts";

import {
  Home,
  CreateItem,
  CreatorDashboard,
  MyAssets,
} from "./components/pages";

import { Container, Sidebar } from "./components/layout/";

import { Spinner } from "./components/common";

declare var window: any;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [marketplace, setMarketplace] = useState<ethers.Contract | null>(null);
  const [nft, setNft] = useState<ethers.Contract | null>(null);

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
    setMarketplace(nft);
    // setIsLoading(false);
  };

  useEffect(() => {
    connectMetamask();
    web3provider();
  });

  return (
    <BrowserRouter>
      <Sidebar walletAddress={walletAddress} />
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/my-assets" element={<CreatorDashboard />} />
            <Route path="/creator-dashboard" element={<MyAssets />} />
          </Routes>
        )}
      </Container>
    </BrowserRouter>
  );
};

export default App;
