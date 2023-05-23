import React, { useState } from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import "./AllImages.module.css";
import styles from "../../styles/allImages.module.css";

interface ImagesProps {
  images: { id: number; image: string };
}

const AllImages = () => {
  const allImages: number[] = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ];

  //fill the heart
  const [color, setColor] = useState("none");

  return (
    <div className={styles.allImagesOuterContainer}>
      <div className={styles.allImagesInnerContainer}>
        {allImages.map((allImages) => (
          <Link
            href={`/image/${allImages._id}`}
            key={allImages}
            className={styles.oneImageContainer}
          >
            <p>
              {allImages.title} Catalog {allImages}
            </p>
            <img
              className={styles.oneImage}
              src={`https://picsum.photos/id/${allImages}/192/200`}
              // alt={allImages.title}
            />
            <svg
              fill={color}
              onClick={() => {
                setColor("#000000");
              }}
              xmlns="http://www.w3.org/2000/svg"
              className={styles.favoriteIcon}
              width="23"
              height="23"
              viewBox="0 0 24 24"
              stroke="#6eadf4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllImages;
