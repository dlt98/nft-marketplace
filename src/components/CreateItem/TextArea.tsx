import { TextAreaProps } from "../../types";
const TextArea = ({
  placeholder,
  rows = 3,
  type,
  onChange,
  name,
}: TextAreaProps) => {
  return (
    <div className="mb-3 xl:w-96">
      <textarea
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none     "
        id={name}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        typeof={type}
      />
    </div>
  );
};

export default TextArea;
