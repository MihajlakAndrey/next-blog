import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { signIn } from 'next-auth/react'

import FormField from '../../UI/FormField'
import {
  RegistrFormSchema,
  SignUpDataType,
} from '../../lib/utils/YupValidationsSchemas'
import MyButton from '../../UI/MyButton'
import Header from './Header'
import { useErrorHandling, useLoading } from '../../hooks'
import { API_URL } from '../../constants'

type PropsType = {
  setIsFormOpen: (open: boolean) => void
  setFormType: (type: 'login' | 'signup') => void
}

const SignUpForm = ({ setFormType, setIsFormOpen }: PropsType) => {
  const form = useForm<SignUpDataType>({
    resolver: yupResolver(RegistrFormSchema),
    mode: 'onSubmit',
  })

  const { isError, error, errorHandler } = useErrorHandling()
  const { isLoading, withLoading } = useLoading()

  const submitHandler = async (data: SignUpDataType) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, data)
      if (res.status === 200) {
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })
        setIsFormOpen(false)
      }
    } catch (err) {
      console.log(err)
      errorHandler(err as Error)
    }
  }

  return (
    <FormProvider {...form}>
      <div className=" bg-white rounded-md max-w-sm  flex flex-col gap-4 text-center p-5 sm:max-w-full sm:mx-4">
        <Header
          name="Sign Up"
          additionalText="Lorem ipsum dolor sit amet consectetur adipisicing sit consectetur adipisicingelit..."
        />
        <form
          className="form flex flex-col gap-4"
          onSubmit={form.handleSubmit((data) =>
            withLoading(submitHandler.bind(null, data))
          )}
        >
          <FormField name={'name'} placeholder={'Name'} />

          <FormField name={'email'} placeholder={'Email'} />

          <FormField
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />

          {isError && <p className=" text-red-500">{error?.errorMessage}</p>}

          <MyButton variant="main" type="submit" isLoading={isLoading}>
            Sign Up
          </MyButton>
        </form>
        <p className="m-4 text-gray-400">
          Have an account?{' '}
          <span
            className=" text-blue-500 hover:border-b hover:border-blue-400 cursor-pointer"
            onClick={() => setFormType('login')}
          >
            Log In
          </span>
        </p>
      </div>
    </FormProvider>
  )
}

export default SignUpForm
