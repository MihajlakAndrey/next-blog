import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    name: string
    email: string
    picture: string
    _id: string | undefined
    user: User | undefined
    provider: string
  }
}
declare module 'next-auth' {
  interface User {
    commentCount: number
    createdAt?: string
    email: string
    image: string
    name: string
    postCount: number
    provider: string
    updatedAt?: string
    __v: number
    _id: string
  }
  interface Session {
    user: {
      commentCount: number
      createdAt?: string
      email: string
      image: string
      name: string
      postCount: number
      provider: string
      updatedAt?: string
      __v: number
      _id: string
    } | null
  }
}
