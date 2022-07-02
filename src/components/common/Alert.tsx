import { useState, useEffect } from "react";
import { AlertProps } from "../../types";

const Alert = ({
  visible = false,
  setAlert,
  text,
  alertOption,
}: AlertProps) => {
  const [visibility, setVisibility] = useState(visible);

  useEffect(() => {
    setVisibility(visible);

    setTimeout(() => {
      setAlert(false);
      setVisibility(false);
    }, 4000);
  }, [visible]);

  return (
    <div
      className={`${!visibility && "hidden"} ${
        alertOption.className
      } absolute bottom-0 inline-flex items-center px-6 py-5 mb-3 text-base rounded-lg w-max right-5`}
      role="alert"
    >
      <div className="w-4 h-4 mr-2">
        <img src={alertOption.icon} alt={alertOption.iconTitle} />
      </div>
      {text}
    </div>
  );
};

export default Alert;
