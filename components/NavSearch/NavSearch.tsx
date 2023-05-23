import * as React from "react";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import AllImages from "../AllImages/AllImages";

import s from "@/styles/Home.module.css";

const NavSearch = () => {
  const [images, setImages] = useState([]);
  const [searchImageString, setSearchImageString] = useState(""); // To search image by title
  //To display creations filtered
  const filteredCreations = () => {
    let creationsFiltered = [...images];
    //Filtered by name
    if (searchImageString) {
      creationsFiltered = creationsFiltered.filter((element) =>
        element.title.toLowerCase().includes(searchImageString.toLowerCase())
      );
    }
    return creationsFiltered;
  };

  const handleImageSearch = (event) => {
    setSearchImageString(event.target.value);
  };

  return (
    <>
      <div>
        {/* input that search creation by name, on change of this input handleCreationSearch pass the value to setSearchCreationString useState */}
        <input
          type="text"
          placeholder="Search by Title"
          value={searchImageString}
          onChange={handleImageSearch}
        />
      </div>

      <div>
        {/* To display images */}
        {filteredCreations().map((image) => {
          return <AllImages image={image} />;
        })}
      </div>
    </>
  );
};

export default NavSearch;
