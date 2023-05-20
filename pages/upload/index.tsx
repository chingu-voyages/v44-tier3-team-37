import { useState, useRef } from 'react'
import { useS3Upload, getImageData } from 'next-s3-upload'
import Image from 'next/image'
import s from './Upload.module.css'
import { Btn } from '@/components/Buttons/Buttons'
import Dropzone from './Dropzone'

export default function Upload() {
  const [imageUrl, setImageUrl] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

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
        <input type='text' name='title' id='title' />
        <div className={s.inputGroup}>
          <div className={s.location}>
            <label htmlFor='location'>Location</label>
            <input type='text' name='location' id='location' />
          </div>
          <div className={s.date}>
            <label htmlFor='date'>Date</label>
            <input type='date' name='date' id='date' />
          </div>
        </div>
        <label htmlFor='description'>Description</label>
        <textarea name='description' id='description' />

        <label htmlFor='alt'>Image alt text</label>
        <input type='text' name='alt' id='alt' />
        <Dropzone setFiles={setFiles} imageUrl={imageUrl} />
        <Btn type='submit' onClick={handleSubmit}>
          Submit
        </Btn>
      </form>
    </div>
  )
}
