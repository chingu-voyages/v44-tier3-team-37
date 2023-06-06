import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CustomSelect from "./Select";
import { Image } from "@/pages/index";
import { TagWithImages } from "@/pages/index";
import { SearchIcon } from "./Icons";
import s from "./SearchBar.module.css";

type Props = {
  displayedImages: Image[];
  setDisplayedImages: React.Dispatch<React.SetStateAction<Image[]>>;
  images: Image[];
  tagsWithImages: TagWithImages[];
};

function SearchBar({
  displayedImages,
  setDisplayedImages,
  images,
  tagsWithImages,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagWithImages[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const results = images.filter(
      (image) =>
        image.title.toLowerCase().includes(searchValue) ||
        image.description.toLowerCase().includes(searchValue)
    );
    setDisplayedImages(results);
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
      <CustomSelect tags={tagsWithImages} setSelectedTags={setSelectedTags} />
    </div>
  );
}

export default SearchBar;
