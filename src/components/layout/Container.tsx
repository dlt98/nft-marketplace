import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="h-screen p-2 pl-20">{children}</div>;
};

export default Container;
