import { ReactNode } from "react";
interface NftContainerProps {
  children: ReactNode;
  className?: string;
}

const NftContainer = ({ children, className = "" }: NftContainerProps) => {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
};

export default NftContainer;
