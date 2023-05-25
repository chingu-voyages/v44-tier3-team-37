import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, Session } from "next-auth";
import styles from '../../styles/Collection.module.css';

type Image = {
    _id: string,
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
    allImages: Image
}

const Collection: React.FC<ImagesProps> = ({ allImages }) => {
    const { data: session, status } = useSession();

    console.log('allImages', allImages)

    return (
        <div>
            <div className={styles.collectionOuterContainer}>
                {allImages.map(image => (
                    <div className={styles.imageContainer} key={image.id}>
                        <img src={image.url} className={styles.image} alt="" />
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.favoriteIcon} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#6eadf4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="#5b7aa4" stroke="#5b7aa4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: {
    req: NextApiRequest;
    res: NextApiResponse;
    authOptions: NextAuthOptions;
}) {
    let allImages = await prisma.image.findMany();

    return {
        props: {
            allImages,
        },
    };
}

export default Collection;