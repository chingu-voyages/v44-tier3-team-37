import { TagWithImages } from "@/pages/index";

import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import type { MultiValue } from "react-select";

type Props = {
  tags: TagWithImages[];
  setSelectedTags: Dispatch<SetStateAction<TagWithImages[]>>;
};

type OptionType = { id: string; value: string; label: string };

const CustomSelect = ({ tags, setSelectedTags }: Props) => {
  const options =
    tags &&
    tags.map((tag) => {
      return {
        id: tag.id,
        value: tag.name,
        label: tag.name,
        images: tag.images,
      };
    });

  const getIds = (selectedOption: MultiValue<OptionType>) => {
    if (Array.isArray(selectedOption)) {
      return selectedOption.map((option) => option.id);
    }
    return [];
  };

  const onChange = (selectedOption: MultiValue<OptionType>) => {
    if (Array.isArray(selectedOption)) {
      const selectedIds = getIds(selectedOption);
      setSelectedTags(tags.filter((tag) => selectedIds.includes(tag.id)));
    }
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder="Filter by tags"
      isMulti
      captureMenuScroll={true}
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
