import { useState } from "react";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { BoldBtn } from "@/components/Buttons/Buttons";

interface IImage {
  id: string;
  uploaded_at: string;
  title: string;
  location: string;
  description: string;
  date: string;
  alt: string;
  url: string;
  tagIds: string;
  organizationId: string;
  userId: string;
}

function SelectedImage({ image }: { image: IImage | null }) {
  const [isDownloading, setIsDownloading] = useState(false);
  if (!image || image.url == null) return <h3>No image found</h3>;

  return (
    <div>
      <Image
        src={image.url}
        alt={image.alt}
        width={400}
        height={400}
        priority={true}
      />
      <h4>{image.title}</h4>
      <BoldBtn
        onClick={() => download(image.url, image.title, setIsDownloading)}
        disabled={isDownloading}
      >
        Download
      </BoldBtn>
    </div>
  );
}

export default SelectedImage;

async function download(
  imageUrl: string,
  imageName: string,
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsDownloading(true);

  try {
    const response = await fetch("/api/image/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const signedImageURL = await response.json();
    const filetype = imageUrl.substring(imageUrl.lastIndexOf(".") + 1);
    imageName = imageName.replaceAll(" ", "-");
    const image = await fetch(signedImageURL, { method: "GET" });
    const imageBlob = await image.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = `${imageName}.${filetype}`;
    link.setAttribute("aria-hidden", "true");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading image", error);
  }
}

export async function getServerSideProps(context: {
  query: { imageId: string };
}) {
  const imageId = context.query.imageId;

  try {
    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });
    return {
      props: {
        image,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { image: null },
    };
  }
}
