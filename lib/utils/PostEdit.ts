import { Api } from '../../services'
import { uploadImage } from './UploadImage'

type PostDataType = {
  tags: string
  text: string
  title: string
  image: string | File | undefined
}

const splitTags = (tags: string) => {
  return Array.from(
    new Set(
      tags
        .replace(/[\,\#]/g, ' ')
        .split(' ')
        .filter((el) => el !== ``)
    )
  )
}

export const createPost = async (postData: PostDataType) => {
  if (typeof postData.image === 'object') {
    const { data: uploadedImageData } = await uploadImage(postData.image)
    const image = uploadedImageData.url
    const data = await Api().posts.createPost({
      title: postData.title,
      text: postData.text,
      tags: splitTags(postData.tags),
      image,
    })

    return data
  } else {
    const data = await Api().posts.createPost({
      title: postData.title,
      text: postData.text,
      tags: splitTags(postData.tags),
      image: postData.image,
    })
    return data
  }
}

export const updatePost = async (postId: string, postData: PostDataType) => {
  if (typeof postData.image === 'object') {
    const { data: uploadedImageData } = await uploadImage(postData.image)
    const image = uploadedImageData.url
    const data = await Api().posts.updatePost(postId, {
      title: postData.title,
      text: postData.text,
      tags: splitTags(postData.tags),
      image,
    })

    return data
  } else {
    const data = await Api().posts.updatePost(postId, {
      title: postData.title,
      text: postData.text,
      tags: splitTags(postData.tags),
      image: postData.image,
    })
    return data
  }
}
