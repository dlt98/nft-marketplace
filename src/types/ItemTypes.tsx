import { BigNumberish } from "ethers";

export interface NFTtype {
  totalPrice: BigNumberish;
  itemId: string;
  seller: string;
  name: string;
  description: string;
  image: string;
}
