import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "white",
    paddingTop: "0px",
    paddingBottom: "0px",
    width: "100%",
    color: "#8F8F8F",
    boxShadow: state.isFocused ? "#1F1D0D" : "none",
    border: state.isFocused ? "1px solid #1F1D0D" : "1px solid #1F1D0D",
    "&:hover": {
      border: state.isFocused ? "1px solid #1F1D0D" : "1px solid #1F1D0D",
    },
    outline: state.isFocused ? "" : "none",
    fontSize: "14px",
    minHeight: "10px",
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: "2px",
    backgroundColor: "white",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2C3E5D" : "white",
    cursor: "pointer",
    outline: "none",
    color: state.isFocused ? "white" : "#334151",
    fontWeight: "600",
    paddingTop: "10px",
    paddingBottom: "10px",
    textTransform: "uppercase",
    fontSize: "12px",
    ":hover": {
      backgroundColor: state.isFocused ? "#2C3E5D" : "white",
      color: state.isFocused ? "white" : "#334151",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#8F8F8F",
    fontSize: "14px",
  }),
};
