import { BigNumberish } from "ethers";

export interface NFTtype {
  totalPrice: BigNumberish;
  price?: string;
  itemId: string;
  seller?: string;
  name: string;
  description: string;
  image: string;
}
export interface UserSettings {
  address: string;
  profileChoice: any;
}

export interface EthInfo {
  description: any;
  market_cap_rank: any;
  market_data: any;
  name: any;
}

export interface SingleAlertOption {
  state: string;
  iconTitle: string;
  icon: string;
  className: string;
}
