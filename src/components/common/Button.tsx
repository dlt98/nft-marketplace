import { ButtonProps } from "../../types";

const Button = ({
  text,
  onClick = () => {},
  href = "#",
  disabled = false,
}: ButtonProps) => (
  <a
    onClick={(e) => {
      if (disabled) return;
      onClick(e);
    }}
    href={href}
    type="button"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    className={`${
      disabled ? "pointer-events-none opacity-40" : ""
    } inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg`}
  >
    {text}
  </a>
);

export default Button;
