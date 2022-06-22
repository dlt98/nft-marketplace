import { LabelProps } from "../../types";

const Label = ({ title, description, required = false }: LabelProps) => {
  return (
    <div className="my-3">
      <h3 className="mb-1 font-medium font-poppins">
        {title}
        {!!required && <span className="ml-1 text-red-600">*</span>}
      </h3>
      <p className="text-xs text-gray-500 font-poppins">{description}</p>
    </div>
  );
};

export default Label;
