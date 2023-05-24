import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { useRouter } from 'next/router';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function SaveUnsaveHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const router = useRouter();
    const imageId = router.query.id;

    // const updateImageCollection = await prisma.user.update({
    //   where: {
    //     id: session.user?.id,
    //   },
    //   data: {
    //     images: {
    //   connect: {
    // imageIds: imageId,
    //   },
    // },
    //     },
    //   },
    // });


    // images: {
    //   disconnect: { imageIds: imageId },
    // },





    if (req.method === 'POST') {
        const tag = await prisma.tag.create({
            data: {
                name: name,
            },
        })
        res.status(201).json(tag)
        return
    }
    if (req.method === 'GET') {
        const tags = await prisma.tag.findMany()
        res.status(200).json(tags)
        return
    }
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
}
