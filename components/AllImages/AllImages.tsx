import React, { useState } from "react";
import prisma from "@/lib/prisma";

interface ImagesProps {
  images: { id: number; image: string };
}

const allImages: React.FC<ImagesProps> = (props) => {
  const allImages: number[] = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ];

  return (
    <div>
      <div>
        {allImages.map((allImages) => (
          <div key={allImages}>
            <img src={`https://picsum.photos/id/${allImages}/192/200`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default allImages;
