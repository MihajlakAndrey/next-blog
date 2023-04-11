import React, { useContext, useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { AxiosError } from 'axios'

import { Comment, CommentForm } from '../../components/Comments'
import { useComments } from '../../hooks'
import { Api } from '../../services'
import { CommentType, PostType } from '../../types'
import Post from '../../components/Post/Post'
import { SideContex } from '../../components/Layout'

type PropsType = {
  post: PostType
}

const PostPage = ({ post }: PropsType) => {
  const { data } = useSession()
  const context = useContext(SideContex)
  
  const { comments, createCommentHandler, deleteCommentHandler } = useComments(
    post?.comments || []
  )

  useEffect(() => {
    if (post?._id) {
      context?.addRecentPostHandler(post)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Post isFull isOwner={post.owner._id === data?.user?._id} post={post} />

      {data?.user?._id && (
        <CommentForm onCreateComment={createCommentHandler} postId={post._id} />
      )}

      {comments.map((comment: CommentType) => (
        <Comment
          key={comment._id}
          comment={comment}
          canDelete={
            post.owner._id === data?.user?._id ||
            comment.owner._id === data?.user?._id
          }
          onDeleteComment={deleteCommentHandler}
        />
      ))}
    </>
  )
}

export default PostPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id

  try {
    const { data: post } = await Api(context).posts.getOnePost(id as string)

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
