import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Tag } from "@/pages/upload";

type ImageData = {
  orgId: string;
  title: string;
  location: string;
  date: string;
  description: string;
  alt: string;
  url: string;
  tagIds: string[];
};

type ImageUpdateData = {
  id: string;
  orgId: string;
  title: string;
  location: string;
  date: string;
  description: string;
  alt: string;
  url: string;
  tagIds: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageId } = req.body as { imageId: string };

  if (req.method === "POST") {

    // DELETE method
    if (imageId) {
      try {
        await prisma.image.delete({
          where: {
            id: imageId
          },
        });

        res.status(200).json({ message: "Image successfully deleted" });
        return
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving image data" });
        return
      }
    }
    //

    try {
      const {
        title,
        location,
        date,
        description,
        alt,
        url,
        tagIds,
        orgId,
      }: ImageData = req.body;
      const safeDate = date != "" ? new Date(date) : null;

      await prisma.image.create({
        data: {
          organization: {
            connect: {
              id: orgId,
            },
          },
          title: title,
          location: location,
          date: safeDate?.toISOString() ?? null,
          description: description,
          alt: alt,
          url: url,
          tags: {
            connect: tagIds.map((id) => ({ id: id })),
          },
        },
      });

      res.status(200).json({ message: "Image data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving image data" });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        id,
        title,
        location,
        date,
        description,
        alt,
        url,
        tagIds,
        orgId,
      }: ImageUpdateData = req.body;
      const safeDate = date != "" ? new Date(date) : null;

      await prisma.image.update({
        where: {
          id: id
        },
        data: {
          title: title,
          location: location,
          date: safeDate?.toISOString() ?? null,
          description: description,
          alt: alt,
          url: url,
          tags: {
            connect: tagIds.map((id) => ({ id: id })),
          },
        },
      });

      res.status(200).json({ message: "Image data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving image data" });
    }
  }
}
