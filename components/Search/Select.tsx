import { Tag } from "@prisma/client";
import React from "react";
import Select from "react-select";

type Props = {
  tags: Tag[];
};

const CustomSelect = ({ tags }: Props) => {
  const options =
    tags &&
    tags.map((tag) => {
      return {
        value: tag.name,
        label: tag.name,
      };
    });

  return (
    <Select
      options={options}
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
        option(base, props) {
          return {
            ...base,
            color: props.isFocused
              ? "var(--primary-text)"
              : "var(--secondary-text)",
            backgroundColor: props.isFocused
              ? "var(--primary-color)"
              : "var(--inputs)",
            "&:active": {
              backgroundColor: "var(--primary)",
            },
            borderRadius: "0.8em",
            fontSize: "0.8em",
          };
        },
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
