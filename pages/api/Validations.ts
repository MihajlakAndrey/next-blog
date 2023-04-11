import { array, object, string } from 'yup'

export const RegistrValidation = object({
  name: string().required().min(3).max(10),
  email: string().required().email(),
  password: string().required().min(3).max(10),
})
export const UpdateValidation = object({
  name: string()
    .required()
    .min(3)
    .max(10, 'Name must be at most 10 characters'),
  email: string().required().email(),
})

export const LoginValidation = object({
  email: string().required().email(),
  password: string().required().min(3).max(10),
})

export const PostCreateValidation = object({
  title: string()
    .required('Title is a required field')
    .min(5, 'Title must be at least 5 characters'),
  text: string()
    .required('Text is a required field')
    .min(10, 'Text must be at least 10 characters'),
  tags: array().of(string()),
  image: string().url(),
})
