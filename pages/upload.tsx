import { useState } from 'react'
import { useS3Upload, getImageData } from 'next-s3-upload'
import Image from 'next/image'

export default function Upload() {
  const [imageUrl, setImageUrl] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  const handleFileChange = async function (file: File) {
    const { url } = await uploadToS3(file)
    const { width, height } = await getImageData(file)
    if (width != undefined) setWidth(width)
    if (height != undefined) setHeight(height)
    setImageUrl(url)
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

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
