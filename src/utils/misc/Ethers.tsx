import { ethers, BigNumberish, BigNumber } from "ethers";

export const formatBigNumber = (bigNumber: BigNumberish): string =>
  ethers.utils.formatUnits(bigNumber, "ether");

export const formatBigNumberToNumber = (number: BigNumberish): number =>
  parseFloat(formatBigNumber(number));

export const formatToEth = (price: string): BigNumber =>
  ethers.utils.parseEther(price.toString());

export const sliceAddress = (address: string): string => {
  if (!address) return "";

  const firstXCharacters = 5;
  const lastXCharacters = 4;

  return `${address.slice(0, firstXCharacters)}...${address.slice(
    address.length - lastXCharacters,
    address.length
  )}`;
};
