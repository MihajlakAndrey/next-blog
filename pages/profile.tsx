import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Router from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

import { useErrorHandling, useImage, useLoading } from '../hooks'
import MyButton from '../UI/MyButton'
import { updateUser } from '../lib/utils/UpdateUser'
import { ProfileFormSchema } from '../lib/utils/YupValidationsSchemas'
import FormField from '../UI/FormField'
import { reloadSession } from '../lib/utils/ReloadSession'

const ProfilePage = () => {
  const { data } = useSession()
  const { error, errorHandler } = useErrorHandling()
  const { isLoading, withLoading } = useLoading()

  const form = useForm({
    resolver: yupResolver(ProfileFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: data?.user?.name || '',
      email: data?.user?.email || '',
    },
  })
  const { image, preview, imgInputRef, imgFile, changeImg, removeImage } =
    useImage(data?.user?.image || '')

  const isRemoveImgBtnHidden =
    (!image && !preview) || data?.user?.provider !== 'credentials'

  const submitHandler = async (data: { name: string; email: string }) => {
    try {
      const res = await updateUser({
        ...data,
        image: imgFile || image,
      })
      if (res.status === 200) {
        Router.push(`/profile`)
        reloadSession()
      }
    } catch (error) {
      errorHandler(error as Error)
      console.log(error)
    }
  }

  useEffect(() => {
    reloadSession()
  }, [])

  return (
    <div className="bg-white sm:p-4 p-20 flex flex-col items-center gap-4 text-lg rounded-md sm:min-h-screen">
      <div className="relative">
        <button
          className="absolute right-0 text-2xl -top-2 font-bold"
          hidden={isRemoveImgBtnHidden}
          type="button"
          onClick={() => removeImage.next()}
        >
          &#x2715;
        </button>
        <Image
          priority={true}
          width={300}
          height={300}
          src={(preview as string) || image || '/defaultUser.png'}
          alt="avatar"
          className=" w-32 h-32 rounded-full m-4 object-cover "
        />
      </div>
      <div className="bg-white rounded-md max-w-sm  flex flex-col gap-4 text-center sm:max-w-full sm:mx-4">
        <div>
          <h1 className="title text-4xl text-gray-800 font-bold py-4">
            {data?.user?.name}
          </h1>

          <p className=" text-gray-400 pb-4">
            Post count - {data?.user?.postCount}
          </p>
          <p className=" text-gray-400 pb-4">
            Comment count - {data?.user?.commentCount}
          </p>
        </div>
        {data?.user?.provider === 'credentials' && (
          <FormProvider {...form}>
            <form
              role="form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit((data) =>
                withLoading(submitHandler.bind(null, data))
              )}
            >
              <input
                onChange={changeImg}
                type="file"
                ref={imgInputRef}
                hidden
              />

              <MyButton
                variant="main"
                type="button"
                onClick={() => imgInputRef.current?.click()}
              >
                Change avatar
              </MyButton>

              <FormField name={'name'} placeholder={'Name'} />
              <FormField name={'email'} placeholder={'Email'} />
              <span className="text-red-500">{error?.errorMessage}</span>
              <MyButton variant="main" type="submit" isLoading={isLoading}>
                Save
              </MyButton>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
