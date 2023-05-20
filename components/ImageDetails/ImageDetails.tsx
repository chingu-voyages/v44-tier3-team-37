import React from "react";
import Link from "next/link";

interface ImagesProps {
  images: { id: number; image: string };
}

const ImageDetails = ({ image }) => {
  return (
    <>
      <p>{image.title}</p>
      <img
        src={`https://picsum.photos/id/${image._id}/192/200`}
        alt={image.title}
      />
    </>
  );
};

export default ImageDetails;
