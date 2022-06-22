import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center h-screen p-2 pl-20 ">
      {children}
    </div>
  );
};

export default Container;
