import { ButtonProps } from "../../types";

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={onClick}
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
