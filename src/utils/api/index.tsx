export const getEthValues = async (setter: any) => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/ethereum");

  const data = await res.json();

  setter(reduceCoingeckoData(data));
};

const reduceCoingeckoData = (data: any) => {
  const { market_cap_rank, description, market_data, name } = data;

  return { market_cap_rank, description, market_data, name };
};
