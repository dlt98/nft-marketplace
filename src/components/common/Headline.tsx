import { HeadlineProps } from "../../types";

const Headline = ({ text, description }: HeadlineProps) => {
  return (
    <div className="relative mx-auto my-2 mb-6 transition-all border-b-2 group w-max">
      <h1 className="text-5xl font-medium font-poppins">{text}</h1>
      <p className="absolute right-0 z-50 p-2 font-bold text-white transition-all origin-top scale-0 rounded-md bg-slate-500 top-14 text-md group-hover:scale-100">
        {description}
      </p>
    </div>
  );
};

export default Headline;
