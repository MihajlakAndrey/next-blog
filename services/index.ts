import axios from 'axios'
import { NextPageContext, GetServerSidePropsContext } from 'next'

import { API_URL } from '../constants'
import { CommentApi } from './comment'
import { PostApi } from './post'
import { UserApi } from './user'

export const Api = (context?: NextPageContext | GetServerSidePropsContext) => {
  const headers = context
    ? {
        'Content-Type': 'application/json',
        cookie: context?.req?.headers.cookie || '',
        withCredentials: true,
      }
    : {
        'Content-Type': 'application/json',
      }

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers,
  })

  return {
    user: UserApi(axiosInstance),
    posts: PostApi(axiosInstance),
    comment: CommentApi(axiosInstance),
  }
}
