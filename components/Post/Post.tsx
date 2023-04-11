import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'

import { PostType } from '../../types'
import PostButtons from './PostButtons'
import { CreationInfo, ViewCommentInfo } from './Info'
import PostTags from './PostTags'
import { truncateString } from '../../lib/utils/TruncateString'

type PropsType = {
  isFull?: boolean
  isOwner?: boolean
  post: PostType
}

const Post = memo((props: PropsType) => {
  const { isFull, isOwner, post } = props

  return (
    <div role='post' className="mb-5 border-b-2 bg-white relative">
      {post.image && (
        <Link href={`/post/${post._id}`}>
          <Image
            priority={true}
            width={1000}
            height={1000}
            src={post.image}
            alt="post Image"
            className={`transition-all rounded-t-md
           ${
             isFull ? `h-full` : `h-80 cursor-pointer hover:opacity-70 `
           } w-full object-cover `}
          />
        </Link>
      )}

      {isOwner && <PostButtons id={post._id} />}

      <CreationInfo owner={post.owner} created={post.createdAt} />

      <div className="sm:px-3 px-20 ">
        <Link href={`/post/${post._id}`}>
          <span
            className={`text-3xl font-bold italic ${
              !isFull && 'hover:text-gray-500 cursor-pointer'
            }`}
          >
            {isFull ? post.title : truncateString(post.title, 150)}
          </span>
        </Link>

        <PostTags tags={post.tags} />

        {isFull && (
          <div className="prose-base pb-4 border-t-2 pt-2">
            <ReactMarkdown>{post.text}</ReactMarkdown>
          </div>
        )}

        <ViewCommentInfo
          viewsCount={post.viewsCount}
          commentsLength={post.comments.length}
        />
      </div>
    </div>
  )
})

export default Post
