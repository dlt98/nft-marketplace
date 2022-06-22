import "../../styles/spinner.css";
import { SpinnerProps } from "../../utils";

const Spinner = ({ label }: SpinnerProps) => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="loading-spinner" />
    {!!label && <p className="ml-5">{label}</p>}
  </div>
);

export default Spinner;
