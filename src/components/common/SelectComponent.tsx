import { SelectProps } from "../../types";
import Select from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "30px",
  }),
};

const SelectComponent = ({ options, value, onChange }: SelectProps) => (
  <Select
    className="react-select"
    options={options}
    styles={customStyles}
    placeholder={value}
    classNamePrefix="react-select"
    onChange={onChange}
    defaultValue={value}
  />
);

export default SelectComponent;
