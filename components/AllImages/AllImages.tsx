import React, { useState } from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import "./AllImages.module.css";

interface ImagesProps {
  images: { id: number; image: string };
}

const allImages: React.FC<ImagesProps> = (props) => {
  const allImages: number[] = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ];

  return (
    <div>
      <div className="all-images-home-page">
        {allImages.map((allImages) => (
          <Link href={`/images/${allImages._id}`} key={allImages}>
            <p>{allImages.title}</p>
            <img
              className="one-image-home-page"
              src={`https://picsum.photos/id/${allImages}/192/200`}
              // alt={allImages.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default allImages;
