const options = [
  {
    label: "Ascending",
    value: "ascending",
    sorting: (nfts) =>
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
    label: "Descending",
    value: "descending",
    sorting: (nfts) =>
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
    label: "Low to high",
    value: "l-h",
    sorting: (nfts) => nfts.sort((a, b) => a.totalPrice - b.totalPrice),
  },
  {
    label: "High to low",
    value: "h-l",
    sorting: (nfts) => nfts.sort((a, b) => b.totalPrice - a.totalPrice),
  },
];

const array = [
  {
    name: "David",
    totalPrice: 12,
  },
  {
    name: "Mate",
    totalPrice: 2,
  },
  {
    name: "Zebra",
    totalPrice: 1,
  },
];

console.log(array);

console.log(options[0].sorting(array));
