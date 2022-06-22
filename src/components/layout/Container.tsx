import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-start h-screen p-5 pb-10 pl-20 overflow-auto ">
      {children}
    </div>
  );
};

export default Container;
