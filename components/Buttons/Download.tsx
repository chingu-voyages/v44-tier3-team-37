import { useState } from "react";
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

function Download({ image }: { image: IImage | null }) {
  const [isDownloading, setIsDownloading] = useState(false);
  if (!image || image.url == null) return null;

  return (
    <BoldBtn
      onClick={() => download(image.url, image.title, setIsDownloading)}
      disabled={isDownloading}
    >
      Download
    </BoldBtn>
  );
}

export default Download;

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
  setIsDownloading(false);
}
