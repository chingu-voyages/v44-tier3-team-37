import { ChangeEvent, FormEvent, useState } from "react";
import CustomSelect from "./Select";
import { Image, Tag } from "@prisma/client";
import { SearchIcon } from "./Icons";
import s from "./SearchBar.module.css";

type Props = {
  searchResults: any;
  setSearchResults: any;
  allImages: Image[];
  tags: Tag[];
};

function SearchBar({
  searchResults,
  setSearchResults,
  allImages,
  tags,
}: Props) {
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const results = allImages.filter((image) =>
      image.title.toLowerCase().includes(search)
    );
    setSearchResults(results);
  };

  return (
    <div className={s.container}>
      <div className={s.searchBar}>
        <div className={s.icon}>
          <SearchIcon />
        </div>
        <input
          onChange={handleChange}
          onSubmit={handleSubmit}
          type="text"
          placeholder="Search images..."
        />
      </div>
      <CustomSelect tags={tags} />
    </div>
  );
}

export default SearchBar;
