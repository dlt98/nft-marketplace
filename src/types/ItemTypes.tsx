import { BigNumberish } from "ethers";

export interface NFTtype {
  totalPrice: BigNumberish;
  price?: string | BigNumberish;
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
