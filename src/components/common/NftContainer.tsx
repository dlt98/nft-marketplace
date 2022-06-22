import { FC, ReactNode } from "react";

const NftContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-wrap gap-2">{children}</div>;
};

export default NftContainer;
