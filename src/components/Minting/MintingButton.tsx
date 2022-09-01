import { useEffect, useRef, useState } from "react";
import { NFT_MINT_PRICE } from "../../utils";
import { MintingButtonProps } from "../../types";

import images from "../../images/art-generation-examples";

const MintingButton = ({ nftImage, onClick }: MintingButtonProps) => {
  const [image, setImage] = useState<any>(images[0]);

  const imageIdx = useRef(0);

  const getImage = (): void => {
    setTimeout(() => {
      setImage(images[imageIdx.current]);
      imageIdx.current++;
      if (imageIdx.current === images.length) imageIdx.current = 0;
    }, 1500);
  };

  useEffect(() => {
    getImage();
  }, [image]);

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="relative group ">
      <img
        src={nftImage || image}
        alt="Newly minted NFT"
        className="border cursor-pointer rounded-xl w-96 h-96"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={onClick}
      />
      <div
        className={`${
          nftImage ? "hidden" : ""
        } absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center m-auto transition-all pointer-events-none bg-slate-300/70 rounded-xl group-hover:bg-slate-300/90`}
      >
        <p className="transition-all w-max h-max font-robotoMono group-hover:text-2xl">
          Mint here for{" "}
          <span className="text-lg font-bold group-hover:text-3xl">
            {NFT_MINT_PRICE} ETH
          </span>
        </p>
      </div>
    </div>
  );
};

export default MintingButton;
