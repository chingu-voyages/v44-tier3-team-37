import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body
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
