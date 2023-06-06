import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CustomSelect from "./Select";
import { Image } from "@/pages/index";
import { TagWithImages } from "@/pages/index";
import { SearchIcon } from "./Icons";
import s from "./SearchBar.module.css";

type Props = {
  initialImages: Image[];
  displayedImages: Image[];
  setDisplayedImages: React.Dispatch<React.SetStateAction<Image[]>>;
  tagsWithImages: TagWithImages[];
};

function SearchBar({
  initialImages,
  displayedImages,
  setDisplayedImages,
  tagsWithImages,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagWithImages[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const results = initialImages.filter(
      (image) =>
        image.title.toLowerCase().includes(searchValue) ||
        image.description.toLowerCase().includes(searchValue)
    );
    if (search.length === 0) {
      setDisplayedImages(initialImages);
    } else {
      setDisplayedImages(results);
    }
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
