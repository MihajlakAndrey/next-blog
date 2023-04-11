import React from 'react'
import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AxiosError } from 'axios'

import { PostType } from '../types'
import { Api } from '../services'
import { createURLSearchParams } from '../lib/utils/CreateURLSearchParams'
import Post from '../components/Post/Post'


type PropsType = {
  posts: PostType[]
}

const HomePage = (props: PropsType) => {
  const { data } = useSession()
  const userId = data?.user?._id

  return (
    <div role="posts">
      {props.posts.length === 0 && (
        <div className="text-center text-2xl">
          <h1 className="font-bold">Nothing found &#9785;</h1>
          <Link className="border-b-2 text-blue-500" href="/">
            Watch all
          </Link>
        </div>
      )}
      {props.posts.map((post: PostType) => (
        <Post isOwner={post.owner._id === userId} key={post._id} post={post} />
      ))}
    </div>
  )
}

export default HomePage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const params = createURLSearchParams(context.query)
    const { data: posts } = await Api(context).posts.getAllPosts(
      params.toString()
    )

    return {
      props: {
        posts,
      },
    }
  } catch (error: AxiosError | any) {
    console.log(error)
    const status = error.response.status
    if (status === 404) {
      return {
        props: {
          error: {
            status,
          },
        },
      }
    }
    return {
      props: {
        error: {
          status,
        },
      },
    }
  }
}
