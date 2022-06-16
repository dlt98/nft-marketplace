import { ethers, BigNumberish } from "ethers";

export const convertBigNumber = (bigNumber: BigNumberish): string =>
  ethers.utils.formatUnits(bigNumber, "ether");
