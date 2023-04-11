import { useEffect, useRef, useState } from 'react'

const useImage = (initialImage?: string) => {
  const imgInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState(initialImage)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [imgFile, setImgFile] = useState<File | null>(null)

  const changeImg = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (!changeEvent.target.files) return

    const file = changeEvent.target.files[0]
    if (file) {
      setImgFile(file)
      const reader = new FileReader()
      reader.onload = (onLoadEvent) => {
        if (onLoadEvent.target !== null) {
          setPreview(onLoadEvent.target.result)
        }
      }
      reader.readAsDataURL(changeEvent.target.files[0])
    } else {
      setPreview(null)
    }
  }

  function* removeImageSequence() {
    if (preview) {
      setImgFile(null)
      yield setPreview(null)
    }
    if (image) {
      yield setImage('')
    }
    return true
  }
  const removeImage = removeImageSequence()

  useEffect(() => {
    setImage(initialImage)
  }, [initialImage])

  return {
    image,
    preview,
    imgInputRef,
    imgFile,
    changeImg,
    removeImage,
  }
}

export default useImage
