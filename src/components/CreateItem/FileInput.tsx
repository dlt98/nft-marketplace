import { FileInputProps } from "../../types";
import { imageIcon, closeIcon } from "../../images";

const FileInput = ({ onChange, image }: FileInputProps) => {
  return (
    <div className="mb-3 w-max">
      <label htmlFor="formFileSm">
        <div
          className="relative flex items-center justify-center p-1 transition-all border-2 border-dashed rounded-lg cursor-pointer border-slate-500 w-72 h-72 group"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <img
            src={image || imageIcon}
            alt="Img icon"
            className={image ? "w-full h-full rounded-xl" : "w-7 h-7"}
          />
          <div className="absolute top-0 right-0 z-50 w-full h-full overflow-hidden transition duration-300 ease-in-out rounded-lg opacity-0 bg-black/20 group-hover:opacity-100" />
        </div>
      </label>
      <input
        className="hidden w-full px-2 py-1 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="formFileSm"
        type="file"
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
