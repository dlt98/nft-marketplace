import { ethers, BigNumberish, BigNumber } from "ethers";

export const formatBigNumber = (bigNumber: BigNumberish): string =>
  ethers.utils.formatUnits(bigNumber, "ether");

export const formatToEth = (price: string): BigNumber =>
  ethers.utils.parseEther(price.toString());
