import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { Tag } from '@/pages/upload'

type ImageData = {
  user: string
  title: string
  location: string
  date: string
  description: string
  alt: string
  url: string
  tagIds: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, location, date, description, alt, url, tagIds, user }: ImageData = req.body
      const safeDate = date != '' ? new Date(date) : null

      const image = await prisma.image.create({
        data: {
          userId: user,
          title: title,
          location: location,
          date: safeDate,
          description: description,
          alt: alt,
          url: url,
          tags: {
            connect: tagIds.map((id) => ({ id: id })),
          },
        },
      })

      res.status(200).json({ message: 'Image data saved successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error saving image data' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
