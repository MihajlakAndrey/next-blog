import axios from 'axios'

import { CloudinaryResType } from '../../types'

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData()
  formData.append('file', imageFile)
  formData.append('upload_preset', 'my-uploads')
  const data = await axios<CloudinaryResType>({
    method: 'post',
    url: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data
}
