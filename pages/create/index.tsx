import React, { useContext, useState } from 'react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import PostImage from '../../components/Post/PostImage'
import { useErrorHandling, useLoading, useImage } from '../../hooks'
import MyButton from '../../UI/MyButton'
import MDEForm from '../../components/MDEForm'
import { createPost, updatePost } from '../../lib/utils/PostEdit'
import { PostType } from '../../types'
import { SideContex } from '../../components/Layout'

type PropsType = {
  post?: PostType
}

const CreatePage = (props: PropsType) => {
  const { post } = props
  const context = useContext(SideContex)
  const router = useRouter()
  
  const isEdit = post ? true : false

  const { error, errorHandler, isError } = useErrorHandling()
  const { isLoading, withLoading } = useLoading()

  const [title, setTitle] = useState<string>(post?.title || '')
  const [tags, setTags] = useState<string>(post?.tags.join(' ') || '')
  const [text, setText] = useState<string>(post?.text || '')
  const { image, preview, imgInputRef, imgFile, changeImg, removeImage } =
    useImage(isEdit ? post?.image : '')

  const submitHandler = async () => {
    const postData = {
      tags,
      text,
      title,
      image: imgFile || image,
    }

    try {
      const data = post
        ? await updatePost(post._id, postData)
        : await createPost(postData)

      if (data.status === 200) {
        router.push(`/post/${data.data._id}`)
        context?.fetchTags()
      }
    } catch (error) {
      errorHandler(error as Error | AxiosError)
    }
  }

  return (
    <>
      <h2 className=" font-semibold pb-2 sm:p-2 text-2xl sm:text-center">
        {isEdit ? 'Edit' : 'Create'} post
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className=" flex flex-col p-4 gap-4 bg-white rounded-md"
      >
        <PostImage
          image={image as string}
          onChange={changeImg}
          fileRef={imgInputRef}
          removeImage={removeImage}
          preview={preview}
        />

        <input
          role="title"
          className="p-2 px-4 text-3xl outline-none w-full  border-b-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          role="tags"
          placeholder="#Tags"
          className="p-2 px-4  outline-none w-full  border-b-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <MDEForm setText={setText} text={text} />

        {isError && (
          <p className="text-xl text-red-500">{error?.errorMessage}</p>
        )}

        <div className="flex gap-4">
          <MyButton
            variant="main"
            type="submit"
            isLoading={isLoading}
            onClick={() => withLoading(submitHandler)}
          >
            {isEdit ? 'Save' : 'Post'}
          </MyButton>

          <MyButton
            disabled={isLoading}
            type="button"
            variant="danger"
            onClick={() => router.push('/')}
          >
            Cancel
          </MyButton>
        </div>
      </form>
    </>
  )
}

export default CreatePage
