import React from "react";
import Link from "next/link";

interface ImagesProps {
  images: { id: number; image: string };
}

const ImageCard = ({ image }) => {
  return (
    <>
      <Link href={`/images/${image._id}`}>
        <p>{image.title}</p>
        <img
          src={`https://picsum.photos/id/${image._id}/192/200`}
          alt={image.title}
        />
      </Link>
    </>
  );
};

export default ImageCard;
