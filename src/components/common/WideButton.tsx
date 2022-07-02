import { WideButtonProps } from "../../types";

const WideButton = ({ onClick, disabled, buttonText }: WideButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={disabled ? "activated-btn" : "disabled-btn"}
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
    >
      {buttonText}
    </button>
  );
};

export default WideButton;
