import { useState, useRef } from 'react'
import prisma from '@/lib/prisma'
import { useS3Upload } from 'next-s3-upload'
import s from './Upload.module.css'
import { Btn, BoldBtn } from '@/components/Buttons/Buttons'
import Dropzone from '@/components/Upload/Dropzone'
import Tags from '@/components/Upload/Tags'
import { useSession } from 'next-auth/react'

export type Tag = {
  name: string
  id: string
}

export type TagWithImages = {
  name: string
  id: string
  imageIds: string[]
}

export default function Upload({ allTags }: { allTags: TagWithImages[] }) {
  const { data: session } = useSession()
  const [files, setFiles] = useState<File[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const { uploadToS3 } = useS3Upload()
  const [preview, setPreview] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const altRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const { url } = await uploadToS3(files[0])
      const res = await fetch('/api/image', {
        method: 'POST',
        body: JSON.stringify({
          user: session && session.user.id,
          title: titleRef.current?.value,
          location: locationRef.current?.value,
          date: dateRef.current?.value,
          description: descRef.current?.value,
          alt: altRef.current?.value,
          url,
          tagIds: tags.map((tag) => tag.id),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={s.upload}>
      <form>
        <h2>Upload Image</h2>
        <label htmlFor='title'>Image title</label>
        <input ref={titleRef} type='text' name='title' id='title' />
        <div className={s.inputGroup}>
          <div className={s.location}>
            <label htmlFor='location'>Location</label>
            <input ref={locationRef} type='text' name='location' id='location' />
          </div>
          <div className={s.date}>
            <label htmlFor='date'>Date</label>
            <input ref={dateRef} type='date' name='date' id='date' />
          </div>
        </div>
        <label htmlFor='description'>Description</label>
        <textarea ref={descRef} name='description' id='description' />
        <label htmlFor='alt'>Image alt text</label>
        <input ref={altRef} type='text' name='alt' id='alt' />
        <Tags tags={tags} setTags={setTags} allTags={allTags} />
        <Dropzone setFiles={setFiles} setPreview={setPreview} preview={preview} />
        <div className={s.btnGroup}>
          <Btn onClick={() => setPreview('')}>Cancel</Btn>
          <BoldBtn onClick={handleSubmit}>Upload</BoldBtn>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps() {
  const tags = await prisma.tag.findMany()
  console.log(tags)

  return {
    props: {
      allTags: tags,
    },
  }
}
