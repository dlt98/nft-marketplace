import { SingleStepProps } from "../../types";

const SingleStep = ({
  step,
  title,
  text,
  active = false,
  onClick,
}: SingleStepProps) => {
  return (
    <li className={`stepper-step ${active ? "stepper-active" : ""}`}>
      <div className="stepper-head" onClick={onClick}>
        <span className="stepper-head-icon"> {step} </span>
        <span className="stepper-head-text">{title} </span>
      </div>
      <div className={`stepper-content ${active ? "block" : "hidden"}`}>
        {text}
      </div>
    </li>
  );
};

export default SingleStep;
