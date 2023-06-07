import { Image } from "@prisma/client";

export type TagWithImages = {
  id: string;
  name: string;
  images: Image[];
};
