import { ethers, BigNumberish } from "ethers";

export const formatBigNumber = (bigNumber: BigNumberish): string =>
  ethers.utils.formatUnits(bigNumber, "ether");
