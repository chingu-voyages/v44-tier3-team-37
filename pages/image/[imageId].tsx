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
  if (!image || image.url == null) return <h3>No image found</h3>;

  return (
    <div>
      <Image src={image.url} alt={image.alt} width={400} height={400} />
      <h4>{image.title}</h4>
      <BoldBtn onClick={() => console.log("download image")}>Download</BoldBtn>
    </div>
  );
}

export default SelectedImage;

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
