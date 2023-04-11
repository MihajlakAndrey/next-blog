import * as yup from 'yup'

export const LoginFormSchema = yup.object({
  email: yup
    .string()
    .required('Email required')
    .email('Incorrect email address'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password is too short'),
})
export const RegistrFormSchema = yup
  .object({
    name: yup
      .string()
      .required('Name required')
      .min(3, 'Name is too short')
      .max(10, 'Name is too long'),
  })
  .concat(LoginFormSchema)

export const ProfileFormSchema = yup.object({
  name: yup
    .string()
    .required('Name required')
    .min(3, 'Name is too short')
    .max(10, 'Name is too long'),
  email: yup
    .string()
    .required('Email required')
    .email('Incorrect email address'),
})

export type LoginDataType = yup.InferType<typeof LoginFormSchema>
export type SignUpDataType = yup.InferType<typeof RegistrFormSchema>
export type ProfileDataType = yup.InferType<typeof ProfileFormSchema>
