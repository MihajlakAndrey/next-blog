import { Api } from '../../services'
import { UserType } from '../../types'
import { uploadImage } from './UploadImage'

export type UserDataType = {
  name: string
  email: string
  image?: string | File
}

export const updateUser = async (userData: UserDataType) => {
  if (typeof userData.image === 'object') {
    const { data: uploadedImage } = await uploadImage(userData.image)
    const image = uploadedImage.url
    const data = await Api().user.updateMe({
      name: userData.name,
      email: userData.email,
      image,
    } as UserType)
    return data
  } else {
    const data = await Api().user.updateMe({
      name: userData.name,
      email: userData.email,
      image: userData.image,
    } as UserType)
    return data
  }
}
