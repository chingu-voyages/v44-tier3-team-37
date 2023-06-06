import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import styles from '../../styles/userCollection.module.css';

type Image = {
  id: string,
  uploaded_at: string,
  title: string,
  location: string,
  description: string,
  date: string,
  alt: string,
  url: string,
  tagIds: string,
  organizationId: string,
  userId: string
}

interface ImagesProps {
  userImages: Image[]
}

const UserCollection: React.FC<ImagesProps> = ({ userImages }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  let imageAlreadySaved: {} | undefined;

  const [favoriteImages, setFavoriteImages] = useState<string[]>(
    userImages ? userImages?.map((image) => image.id) : []
  );

  const updateUserCollection = async (imageId: string) => {
    imageAlreadySaved = favoriteImages.includes(imageId);

    imageAlreadySaved
      ? setFavoriteImages((cur) => cur.filter((id) => id !== imageId))
      : setFavoriteImages((cur) => [...cur, imageId]);

    try {
      const body = { imageId, imageAlreadySaved };

      const response = await fetch(`/api/saveImage/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })

    } catch (error) {
      console.error('Error saving/unsaving image', error)
    }
  }

  const favorited = (imageId: string) => {
    return !!favoriteImages.find(id => id === imageId)
  }

  const routeToHomePage = () => {
    router.push('/');
  }


  return (
    <>
      <div className={styles.userCollectionOuterContainer}>
        {session?.user.role === "USER" &&
          <div className={styles.userCollectionImagesContainer}>
            {userImages.map(image => (
              <div className={styles.userCollectionImageContainer} key={image.id}>
                <img src={image.url} className={styles.userCollectionImage} alt={image.alt} />
                {favorited(image.id)
                  ?
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => updateUserCollection(image.id)} className={styles.favoriteIcon} width="23" height="23" viewBox="0 0 24 24" fill="#5b7aa4" stroke="#5b7aa4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => updateUserCollection(image.id)} className={styles.favoriteIcon} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#6eadf4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                }
              </div>
            ))}
          </div>
        }
        {userImages && !userImages.length &&
          <div className={styles.noUserCollectionOuterContainer}>
            <div className={styles.noUserCollectionText}>You have not saved any images to your collection</div>
            <div>
              <button onClick={() => routeToHomePage()} className={styles.noUserCollectionButton}>Find images</button>
            </div>
          </div>
        }
      </div>
    </>
  )
}


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

  let userImages = null;

  if (session && session.user.role === "USER") {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id
      },
      include: {
        images: true
      }
    })
    userImages = user?.images;
  }

  return {
    props: {
      userImages,
    },
  };
}


export default UserCollection;