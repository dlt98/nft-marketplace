import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  CreateItem,
  CreatorDashboard,
  MyAssets,
} from "./components/pages";
import Sidebar from "./components/navigation/Sidebar";

declare var window: any;

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  //Metamask get wallet address
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    connectMetamask();
  });

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-item" element={<CreateItem />} />
        <Route path="/my-assets" element={<CreatorDashboard />} />
        <Route path="/creator-dashboard" element={<MyAssets />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
