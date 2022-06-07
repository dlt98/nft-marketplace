import "../../styles/spinner.css";

const Spinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="loading-spinner" />
    <p className="ml-5">Loading...</p>
  </div>
);

export default Spinner;
