import React from "react";
import Select from "react-select";

const CustomSelect = () => {
  return (
    <Select
      placeholder="Filter by tags"
      isMulti
      styles={{
        container: (base, state) => ({
          ...base,
          borderRadius: "0.8em",
        }),
        control: (base, state) => ({
          ...base,
          height: "37px",
          borderRadius: "0.8em",
          backgroundColor: "var(--inputs)",
          border: "none",
          boxShadow: state.isFocused ? "0 0 0 2px var(--primary-text)" : "0",
        }),
        valueContainer: (base, state) => ({
          ...base,
          height: "37px",
          padding: "0 1em !important",
        }),
        placeholder: (base, state) => ({
          ...base,
          fontSize: "0.8em",
        }),
        menu: (base, state) => ({
          ...base,
          borderRadius: "0.8em",
          backgroundColor: "var(--inputs)",
        }),
        input(base, props) {
          return {
            ...base,
            height: "37px",
            margin: "0 !important",
            padding: "0 !important",
          };
        },
      }}
    />
  );
};

export default CustomSelect;
