import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CustomSelect from "./Select";
import { Image } from "@prisma/client";
import { TagWithImages } from "@/types/types";
import { SearchIcon } from "./Icons";
import s from "./SearchBar.module.css";

type Props = {
  searchResults: any;
  setSearchResults: any;
  allImages: Image[];
  tags: TagWithImages[];
};

function SearchBar({
  searchResults,
  setSearchResults,
  allImages,
  tags,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagWithImages[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const results = allImages.filter((image) =>
      image.title.toLowerCase().includes(e.target.value.toLowerCase())
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
          value={search}
          type="text"
          placeholder="Search images..."
        />
      </div>
      <CustomSelect tags={tags} setSelectedTags={setSelectedTags} />
    </div>
  );
}

export default SearchBar;
