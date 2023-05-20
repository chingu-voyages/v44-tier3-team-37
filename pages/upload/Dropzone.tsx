import { getImageData } from 'next-s3-upload'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RxUpload } from 'react-icons/rx'
import clsx from 'clsx'
import Image from 'next/image'
import s from './Dropzone.module.css'

type DropzoneProps = {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  imageUrl: string
}

function Dropzone({ setFiles, imageUrl }: DropzoneProps) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [preview, setPreview] = useState('')

  const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
    if (acceptedFiles.length > 0) {
      const { width, height } = await getImageData(acceptedFiles[0])
      if (width != undefined) setWidth(width)
      if (height != undefined) setHeight(height)
      setFiles(acceptedFiles as File[])
      setPreview(URL.createObjectURL(acceptedFiles[0]))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg'],
      'image/avif': ['.avif'],
      'image/webp': ['.webp'],
    },
  })

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [])

  const dropzoneStyle = clsx(s.dropzone, isDragActive && s.active, isDragAccept && s.accept, isDragReject && s.reject)

  const warningStyle = clsx(isDragReject && s.visible, s.warning)

  return (
    <>
      <div className={s.container}>
        <div className={dropzoneStyle}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop</p>
            <RxUpload size={'3em'} />
            <p>Or click to upload</p>
          </div>
        </div>

        <div className={s.preview}>
          <img className={s.image} src={preview} alt='' />
        </div>
      </div>
      <p className={warningStyle}>Unsupported file type...</p>
    </>
  )
}

export default Dropzone
