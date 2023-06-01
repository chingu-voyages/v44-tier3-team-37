import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function SaveImageHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const { imageId, imageAlreadySaved } = req.body as { imageId: string, imageAlreadySaved: {} | undefined };

    if (req.method === 'POST') {

        if (!imageAlreadySaved) {
            const saveImage = await prisma.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    images: {
                        connect: { id: imageId }
                    }
                }
            })
            res.status(201).json(saveImage)
            return
        }

        if (imageAlreadySaved) {
            const unsaveImage = await prisma.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    images: {
                        disconnect: [{ id: imageId }]
                    }
                }
            })
            res.status(200).json(unsaveImage)
            return
        }
    }
}
