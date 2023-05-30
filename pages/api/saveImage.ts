import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
// import { useRouter } from 'next/router';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function SaveImageHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    // const router = useRouter();
    // const imageId = router.query.id;
    const imageId = req.query.id as string;

    if (req.method === 'POST') {
        const saveImageToCollection = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                images: {
                    connect: { id: imageId }
                }
            },
        })
        res.status(201).json(saveImageToCollection)
        return
    }

    if (req.method === 'DELETE') {
        const removeImageFromCollection = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                images: {
                    disconnect: [{ id: imageId }] 
                }
            }
        })
        res.status(200).json(removeImageFromCollection)
        return
    }
}
