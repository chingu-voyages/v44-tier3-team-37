import { useState } from 'react'
import { useS3Upload, getImageData } from 'next-s3-upload'
import Image from 'next/image'
import s from '../styles/upload.module.css'

export default function Upload() {
  const [imageUrl, setImageUrl] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [files, setFiles] = useState<File[]>([])
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  //   const handleFileChange = async function (file: File) {
  //     const { url } = await uploadToS3(file)
  //     const { width, height } = await getImageData(file)
  //     if (width != undefined) setWidth(width)
  //     if (height != undefined) setHeight(height)
  //     setImageUrl(url)
  //   }

  const handleFileChange = async function (event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const file = event.target.files[0] as File
    setFiles([file])
    const { width, height } = await getImageData(file)
    if (width != undefined) setWidth(width)
    if (height != undefined) setHeight(height)
  }

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

        <label htmlFor='description'>Description</label>
        <input type='text' name='description' id='description' />

        <label htmlFor='location'>Location</label>
        <input type='text' name='location' id='location' />

        <label htmlFor='alt'>Image alt text</label>
        <input type='text' name='alt' id='alt' />

        <input type='file' accept='image/*' onChange={handleFileChange} />
        <button type='submit'>Submit</button>
      </form>

      {imageUrl && (
        <div>
          <Image src={imageUrl} width={width} height={height} alt='' />
          <div>{imageUrl}</div>
          <div>
            {height}x{width}
          </div>
        </div>
      )}
    </div>
  )
}
