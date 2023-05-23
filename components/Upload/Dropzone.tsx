/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { getImageData } from 'next-s3-upload'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { UploadCloud } from './Icons'
import clsx from 'clsx'
import Image from 'next/image'
import s from './Dropzone.module.css'

type DropzoneProps = {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  setPreview: React.Dispatch<React.SetStateAction<string>>
  preview: string
}

function Dropzone({ setFiles, setPreview, preview }: DropzoneProps) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

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

  function revokeObjectURL() {
    if (preview) URL.revokeObjectURL(preview)
  }

  useEffect(() => {
    return () => {
      revokeObjectURL()
    }
  }, [])

  const dropzoneStyle = clsx(s.dropzone, isDragActive && s.active, isDragAccept && s.accept, isDragReject && s.reject)

  const warningStyle = clsx(isDragReject && s.visible, s.warning)

  return (
    <>
      <div className={s.container}>
        {preview != '' ? (
          <div className={s.imageWrapper}>
            <img className={s.image} src={preview} alt='' />
            <p>
              {height} x {width}
            </p>
          </div>
        ) : (
          <div className={dropzoneStyle}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop</p>
              <UploadCloud size={48} />
              <p>Or click to upload</p>
            </div>
          </div>
        )}
      </div>
      <p className={warningStyle}>Unsupported file type...</p>
    </>
  )
}

{
  /* <Image
              src='https://fakeimg.pl/400x400/efeff0/464646?text=Preview&font=noto'
             width={260}
             height={260}
             alt='preview image'
               style={{ objectFit: 'contain' }}
           /> */
}

export default Dropzone
