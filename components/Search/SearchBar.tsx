import { ChangeEvent, FormEvent, useState } from "react";
import { Image } from "@/lib/prisma";
import { SearchIcon } from "./Icons";
import s from "./SearchBar.module.css";

type Props = {
  searchResults: any;
  setSearchResults: any;
  allImages: Image[];
};

function SearchBar({ searchResults, setSearchResults, allImages }: Props) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
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
  );
}

export default SearchBar;
