import { useState, useRef } from 'react'
import { useS3Upload } from 'next-s3-upload'
import s from './Upload.module.css'
import { Btn, BoldBtn } from '@/components/Buttons/Buttons'
import Dropzone from './Dropzone'

export default function Upload() {
  const [imageUrl, setImageUrl] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const { uploadToS3 } = useS3Upload()
  const [preview, setPreview] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const altRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { url } = await uploadToS3(files[0])
    setImageUrl(url)
  }

  return (
    <div className={s.upload}>
      <form onSubmit={handleSubmit}>
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
        <Dropzone setFiles={setFiles} setPreview={setPreview} preview={preview} />
        <div className={s.btnGroup}>
          <Btn onClick={() => setPreview('')}>Cancel</Btn>
          <BoldBtn type='submit' onClick={handleSubmit}>
            Upload
          </BoldBtn>
        </div>
      </form>
    </div>
  )
}
