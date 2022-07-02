import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NFTtype } from "../../types";
import SelectComponent from "./SelectComponent";
import { formatBigNumberToNumber } from "../../utils";

interface reducedOption {
  value: string;
  label: string;
}

interface option extends reducedOption {
  sorting?: (arg0: NFTtype[]) => void;
}

const options: option[] = [
  {
    label: "A-Z",
    value: "ascending",
    sorting: (nfts: NFTtype[]): NFTtype[] =>
      nfts.sort((a, b) => {
        const fa = a.name.toLowerCase();
        const fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }),
  },
  {
    label: "Z-A",
    value: "descending",
    sorting: (nfts: NFTtype[]): NFTtype[] =>
      nfts.sort((a, b) => {
        const fa = a.name.toLowerCase();
        const fb = b.name.toLowerCase();

        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      }),
  },
  {
    label: "Low to high",
    value: "l-h",
    sorting: (nfts: NFTtype[]): NFTtype[] =>
      nfts.sort(
        (a, b) =>
          formatBigNumberToNumber(a.totalPrice) -
          formatBigNumberToNumber(b.totalPrice)
      ),
  },
  {
    label: "High to low",
    value: "h-l",
    sorting: (nfts: NFTtype[]): NFTtype[] =>
      nfts.sort(
        (a, b) =>
          formatBigNumberToNumber(b.totalPrice) -
          formatBigNumberToNumber(a.totalPrice)
      ),
  },
];

const findOption = (value: string) =>
  options.find((option) => option.value === value);

interface SortButtonProps {
  setNfts: Dispatch<SetStateAction<NFTtype[]>>;
  nfts: NFTtype[];
}

const SortButton = ({ nfts, setNfts }: SortButtonProps) => {
  const [ordering, setOrdering] = useState<any>(findOption("ascending")!);

  useEffect(() => {
    if (!nfts.length) return;

    const sortedNfts: NFTtype[] = ordering.sorting(nfts);
    console.log("sortedNfts", sortedNfts);
    //This is not updating properly

    setNfts(sortedNfts);
  }, [ordering]);

  return (
    <div>
      <SelectComponent
        options={options}
        value={ordering.label}
        onChange={setOrdering}
      />
    </div>
  );
};

export default SortButton;
