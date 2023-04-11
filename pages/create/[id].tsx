import { AxiosError } from 'axios'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Api } from '../../services'
import create from './index'

export default create

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id
  const session = await getSession(context)

  try {
    const { data: post } = await Api(context).posts.getOnePost(id as string)
    if (post.owner._id !== session?.user?._id) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
        props: {},
      }
    }

    return {
      props: {
        post: post,
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
