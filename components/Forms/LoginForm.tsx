import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import FormField from '../../UI/FormField'
import {
  LoginDataType,
  LoginFormSchema,
} from '../../lib/utils/YupValidationsSchemas'
import MyButton from '../../UI/MyButton'
import Header from './Header'
import { useLoading } from '../../hooks'

type PropsType = {
  setIsFormOpen: (open: boolean) => void
  setFormType: (type: 'login' | 'signup') => void
}

const LoginForm = ({ setFormType, setIsFormOpen }: PropsType) => {
  const form = useForm<LoginDataType>({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [errMsg, setErrMsg] = useState('')
  const { isLoading, withLoading } = useLoading()

  const submitCredentialsHandler = async (data: LoginDataType) => {
    const res = await signIn('credentials', { ...data, redirect: false })
    if (res?.status === 200) {
      setIsFormOpen(false)
    }
    if (res?.status === 401) {
      setErrMsg(res.error as string)
    }
  }

  const submitGitHubHandler = async () => {
    await signIn('github')
  }

  return (
    <FormProvider {...form}>
      <div className=" bg-white rounded-md max-w-sm  flex flex-col gap-4 text-center p-5 sm:max-w-full sm:mx-4">
        <Header
          name="Log In"
          additionalText="Lorem ipsum dolor sit amet consectetur adipisicing sit consectetur adipisicingelit..."
        />

        <form
          className="form flex flex-col gap-4"
          onSubmit={form.handleSubmit((data) =>
            withLoading(submitCredentialsHandler.bind(null, data))
          )}
        >
          <FormField name={'email'} placeholder={'Email'} />

          <FormField
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />

          <span className="text-red-500">{errMsg}</span>

          <MyButton variant="main" type="submit" isLoading={isLoading}>
            Log In
          </MyButton>
        </form>

        <div className="line relative p-4">
          <hr />
          <span className="absolute font-semibold bg-white p-2 top-3.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            or
          </span>
        </div>

        <button
          className="bg-black rounded-md py-3 px-4 text-gray-50 text-lg border border-black font-medium hover:opacity-75 transition-all"
          type="button"
          onClick={() => withLoading(submitGitHubHandler)}
        >
          <Image
            src="https://authjs.dev/img/providers/github-dark.svg"
            alt=""
            className="float-left"
            width={30}
            height={30}
            priority
          />
          Sign in with GitHub
        </button>

        <p className="p-4 text-gray-400">
          Dont have an account yet?{' '}
          <span
            className=" text-blue-500 hover:border-b hover:border-blue-400 cursor-pointer "
            onClick={() => setFormType('signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </FormProvider>
  )
}

export default LoginForm
