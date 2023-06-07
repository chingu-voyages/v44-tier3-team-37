import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CustomSelect from "./Select";
import { Image } from "@/pages/index";
import { TagWithImages } from "@/pages/index";
import { SearchIcon } from "./Icons";
import s from "./SearchBar.module.css";

type Props = {
  initialImages: Image[];
  setDisplayedImages: React.Dispatch<React.SetStateAction<Image[]>>;
  tagsWithImages: TagWithImages[];
};

function SearchBar({
  initialImages,
  setDisplayedImages,
  tagsWithImages,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagWithImages[]>([]);

  // Helper function to find unique images
  const findUniqueImages = (images: Image[]) => {
    const uniqueImages: Image[] = [];
    const imageIds = new Set();

    images.forEach((image) => {
      if (!imageIds.has(image.id)) {
        uniqueImages.push(image);
        imageIds.add(image.id);
      }
    });

    return uniqueImages;
  };

  // Whenever initialImages, search, or selectedTags changes, we recalculate the displayedImages
  useEffect(() => {
    let filteredByTags: Image[] = [];

    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        filteredByTags = filteredByTags.concat(tag.images);
      });
      filteredByTags = findUniqueImages(filteredByTags);
      filteredByTags = filteredByTags.filter((image) =>
        initialImages.some((initImage) => initImage.id === image.id)
      );
    } else {
      filteredByTags = initialImages;
    }

    if (search !== "") {
      const searchLower = search.toLowerCase();
      filteredByTags = filteredByTags.filter(
        (image) =>
          image.title.toLowerCase().includes(searchLower) ||
          image.description.toLowerCase().includes(searchLower)
      );
    }
    setDisplayedImages(findUniqueImages(filteredByTags));
  }, [initialImages, search, selectedTags]);

  return (
    <div className={s.container}>
      <div className={s.searchBar}>
        <div className={s.icon}>
          <SearchIcon />
        </div>
        <input
          onChange={(e) => setSearch(e.target.value)}
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
