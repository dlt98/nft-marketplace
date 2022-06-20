import { HeadlineProps } from "../../types";

const Headline = ({ text, description }: HeadlineProps) => {
  return (
    <div className="relative mx-auto my-2 mb-6 transition-all border-b-2 group w-max">
      <h1 className="text-4xl ">{text}</h1>
      <p className="absolute right-0 p-2 font-bold text-white transition-all origin-top scale-0 bg-gray-600 rounded-md text-md group-hover:scale-100">
        {description}
      </p>
    </div>
  );
};

export default Headline;
