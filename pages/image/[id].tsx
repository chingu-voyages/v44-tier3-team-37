import Head from "next/head";
import prisma from "@/lib/prisma";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Download from "@/components/Buttons/Download";
import { Organization } from "@prisma/client";
import Link from "next/link";
import styles from "../../styles/oneImage.module.css";
import s from "@/styles/Home.module.css";

type Image = {
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
};

interface ImagesProps {
  allImages: Image[];
  organizationImages?: Image[];
  userImages: Image[];
}

const ImageDetails: React.FC<ImagesProps> = ({
  allImages,
  organizationImages,
  userImages,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  let imageAlreadySaved: {} | undefined;
  const [favoriteImages, setFavoriteImages] = useState<string[]>(
    userImages ? userImages?.map((image) => image.id) : []
  );

  // To filter one image from all images
  let imageFiltered = [...allImages];
  imageFiltered = imageFiltered.filter((element) =>
    element.id.includes(`${id}`)
  );

  // if user role is NONE, route to onboarding form
  if (session?.user?.role == "NONE") {
    router.push("/auth/new-user");
  }

  const updateUserCollection = async (imageId: string) => {
    imageAlreadySaved = favoriteImages.includes(imageId);

    // update favoriteImages array
    imageAlreadySaved
      ? setFavoriteImages((cur) => cur.filter((id) => id !== imageId))
      : setFavoriteImages((cur) => [...cur, imageId]);

    try {
      const body = { imageId, imageAlreadySaved };

      const response = await fetch(`/api/saveImage/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Error saving/unsaving image", error);
    }
  };

  const favorited = (imageId: string) => {
    return !!favoriteImages.find((id) => id === imageId);
  };

  return (
    <>
      <Head>
        <title>Image Vault</title>
        <meta
          name="description"
          content="Find and collect historical images."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/image-vault-logo-dall-e.png" />
      </Head>
      <main className={s.main}>
        <div className={styles.imageDetailsPage}>
          {imageFiltered.map((image) => (
            <div className={styles.imagePresentation} key={image.id}>
              <img
                src={image.url}
                className={styles.imgDetail}
                alt={image.alt}
              />

              <div className={styles.imageDetails}>
                <h2 className={styles.imageDetailsTitle}>{image.title}</h2>
                {favorited(image.id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => updateUserCollection(image.id)}
                    className={styles.favoriteIcon}
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="#5b7aa4"
                    stroke="#5b7aa4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => updateUserCollection(image.id)}
                    className={styles.favoriteIcon}
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6eadf4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                )}
                <p className={styles.imageDetailsDescription}>
                  {image.location}
                </p>
                <p className={styles.imageDetailsDescription}>
                  {image.description}
                </p>
                <Download image={image} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
  authOptions: NextAuthOptions;
}) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  let allImages = await prisma.image.findMany();
  let organizationImages = null;
  let userImages = null;

  if (session && session.user.role === "ORG") {
    const org = await prisma.organization.findFirst({
      where: {
        user: {
          id: session.user.id,
        },
      },
      include: {
        images: true,
      },
    });
    organizationImages = org?.images;
  }

  if (session && session.user.role === "USER") {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        images: true,
      },
    });
    userImages = user?.images;
  }

  return {
    props: {
      allImages,
      organizationImages,
      userImages,
    },
  };
}

export default ImageDetails;
