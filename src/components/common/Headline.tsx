import { HeadlineProps } from "../../types";

const Headline = ({ text, description }: HeadlineProps) => {
  return (
    <div className="my-2 mb-6 transition-all border-b-2 group">
      <h1 className="text-4xl ">{text}</h1>
      <p className="absolute w-1/2 p-2 ml-3 font-bold text-white transition-all origin-top-left scale-0 bg-gray-600 rounded-md text-md left-20 group-hover:scale-100">
        {description}
      </p>
    </div>
  );
};

export default Headline;
