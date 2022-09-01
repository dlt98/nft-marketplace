import { UserSettings } from "../../types";

export const saveToStorage = (
  address: string,
  userSettings: UserSettings
): void => {
  let currentData: UserSettings[] = getFromStorage();

  //If there is nothing in storage
  if (!currentData.length) {
    setToStorage([userSettings]);
    return;
  }

  const index: number = findIndexFromKeyVal("address", address, currentData);
  //If there is no setting saved in memory
  if (index === -1) {
    currentData.push(userSettings);
    return;
  }

  currentData[index] = userSettings;

  localStorage.setItem("userSettings", JSON.stringify(currentData));
};

const findIndexFromKeyVal = (key: string, val: string, array: any[]) =>
  array.findIndex((currVal) => currVal[key] === val);

const getFromStorage = (): UserSettings[] => {
  // Retrieve the object from storage
  const currentData = localStorage.getItem("userSettings");

  return currentData ? JSON.parse(currentData) : [];
};

export const getSpecificSettingsFromStorage = (
  address: string
): UserSettings | null => {
  const storedValues = getFromStorage();

  //Returns undefined if nothing is there
  return storedValues.find((value) => value.address === address) || null;
};

const setToStorage = (currentData: UserSettings[]): void =>
  localStorage.setItem("userSettings", JSON.stringify(currentData));

export const saveMintedToStorage = (array: number[]) => {
  localStorage.setItem("mintedNfts", JSON.stringify(array));
};

export const getMintedFromStorage = (): number[] => {
  const storage = localStorage.getItem("mintedNfts");

  return storage ? JSON.parse(storage) : [];
};
