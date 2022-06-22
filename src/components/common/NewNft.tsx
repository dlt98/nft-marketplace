import { Button } from "./index";

interface NewNftProps {
  name: string;
  image: string;
  price: string;
  collection: string;
  description?: string;
  onClick: () => void;
}
const NewNft = ({
  image,
  name,
  price,
  collection = "Tester",
  description,
  onClick,
}: NewNftProps) => {
  return (
    <div className="p-1 transition-all border-2 rounded-lg hover:-translate-y-1 max-w-[300px] w-max  group hover:shadow-2xl">
      <div className="relative max-w-sm overflow-hidden rounded-lg">
        <img
          src={image}
          alt="NFT img"
          className="w-full h-full transition-all ease-in-out group-hover:scale-110"
        />
        <div
          className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden transition duration-300 ease-in-out opacity-0 bg-black/70 hover:opacity-100"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <div className="m-3">
            <h3 className="mb-1 text-sm text-white">Description: </h3>
            <p className="text-sm font-bold md:text-base lg:text-lg text-gray-50">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="m-2">
        <p className="text-xs text-grey-50 font-monsterrat">{collection}</p>
        <h3 className="mt-1 font-semibold font-monsterrat">{name}</h3>
      </div>

      <div className="flex items-center justify-between px-3 py-4 bg-gray-100 rounded-xl">
        <div>
          <h3 className="mb-1 text-xs font-medium text-gray-800 font-monsterrat">
            Price
          </h3>
          <p className="text-sm font-semibold font-inter">{price} ETH</p>
        </div>
        <div className="transition-all origin-right scale-0 group-hover:scale-100">
          <Button text="Buy" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default NewNft;
