import { useState, useRef, use, useEffect } from 'react'
import prisma from '@/lib/prisma'
import { useS3Upload } from 'next-s3-upload'
import { NextApiRequest, NextApiResponse } from 'next'

import s from './Upload.module.css'
import { Btn, BoldBtn } from '@/components/Buttons/Buttons'
import Dropzone from '@/components/Upload/Dropzone'
import Tags from '@/components/Upload/Tags'
import { useSession } from 'next-auth/react'

import { Loader } from '@/components/Upload/Loader'

export type Tag = {
  name: string
  id: string
}

export type TagWithImages = {
  name: string
  id: string
  imageIds: string[]
}

export default function Upload() {
  const { data: session } = useSession()
  const [allTags, setAllTags] = useState<TagWithImages[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const { uploadToS3 } = useS3Upload()
  const [preview, setPreview] = useState('')
  const [btnState, setBtnState] = useState<'loading' | 'error' | 'success' | null>(null)

  const titleRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const altRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/tag')
      .then((res) => res.json())
      .then((data) => setAllTags(data))
  }, [tags])

  const clearForm = function () {
    setPreview('')
    setFiles([])
    setTags([])
    titleRef.current ? (titleRef.current.value = '') : null
    locationRef.current ? (locationRef.current.value = '') : null
    dateRef.current ? (dateRef.current.value = '') : null
    descRef.current ? (descRef.current.value = '') : null
    altRef.current ? (altRef.current.value = '') : null
  }

  const handleSubmit = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBtnState('loading')
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
      const status = res.status
      const data = await res.json()
      if (status === 200) {
        setBtnState('success')
        clearForm()
      }
      console.log(data)
    } catch (error) {
      setBtnState('error')
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
        <p>{btnState === 'error' ? 'File was not uploaded. Please try again' : btnState === 'success' ? 'File uploaded successfully!' : null}</p>
        <div className={s.btnGroup}>
          <Btn onClick={() => setPreview('')}>Cancel</Btn>
          <BoldBtn onClick={handleSubmit}>
            {btnState === 'loading' ? <Loader size='16' /> : null}
            {btnState === 'error' ? 'Upload' : null}
            {btnState === 'success' ? 'Success!' : null}
            {btnState === null ? 'Upload' : null}
          </BoldBtn>
        </div>
      </form>
    </div>
  )
}

// export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
//   res.setHeader('Cache-Control', 'no-cache')
//   const tags = await prisma.tag.findMany()
//   // console.log(tags)

//   return {
//     props: {
//       allTags: tags,
//     },
//   }
// }
