import { NFTProps } from "../../types";
import { convertBigNumber } from "../../utils";

const NFT = ({ image, name, description, price, onClick }: NFTProps) => (
  <div className="overflow-hidden border shadow rounded-xl">
    <img src={image} alt={`nft-${name}`} />
    <div className="p-4">
      <p style={{ height: "64px" }} className="text-2xl font-semibold">
        {name}
      </p>
      <div style={{ height: "70px", overflow: "hidden" }}>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
    <div className="p-4 bg-black">
      <p className="text-white text-2xl-mb 4-font-bold">
        {convertBigNumber(price)} Ethereum
      </p>
      <button
        className="w-full px-12 py-2 font-bold text-white bg-pink-500 rounded"
        onClick={onClick}
      >
        Buy
      </button>
    </div>
  </div>
);

export default NFT;
