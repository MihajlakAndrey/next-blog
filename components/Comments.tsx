import React, { useState } from 'react'

import { useLoading } from '../hooks'
import { CommentType } from '../types'
import MyButton from '../UI/MyButton'
import { CreationInfo } from './Post/Info'

type CommentPropsType = {
  comment: CommentType
  canDelete: boolean
  onDeleteComment: (commentId: string) => Promise<void>
}

export const Comment = (props: CommentPropsType) => {
  const { comment, canDelete, onDeleteComment } = props
  const { isLoading, withLoading } = useLoading()

  return (
    <div role='comment' className="mb-4 border-l-4  relative bg-white">
      <CreationInfo owner={comment.owner} created={comment.createdAt} />
      <p className="pb-3 px-3">{comment.text}</p>

      {canDelete && (
        <button
          onClick={() => withLoading(onDeleteComment.bind(null, comment._id))}
          className="absolute top-3 right-3 rounded-md "
        >
          {isLoading ? (
            <p className="text-3xl w-10 h-10 animate-spin ">&#9696;</p>
          ) : (
            <p className="text-2xl w-9 h-9 hover:bg-slate-100 cursor-pointer ">
              &#x2715;
            </p>
          )}
        </button>
      )}
    </div>
  )
}

type CommentFormType = {
  postId: string
  onCreateComment: (postId: string, text: string) => Promise<void>
}

export const CommentForm = (props: CommentFormType) => {
  const { postId, onCreateComment } = props
  const [text, setText] = useState<string>('')
  const { isLoading, withLoading } = useLoading()

  const createCommentHandler = async () => {
    await onCreateComment(postId, text)
    setText('')
  }

  return (
    <div role='commentForm' className="grid w-full p-9 sm:p-4 pb-12 gap-4 bg-white mb-4 relative">
      <h2 className="text-xl font-semibold border-b-2">Leave a Comment</h2>
      <div className="grid grid-cols-1 ">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="comment"
          placeholder="Comment..."
          className="p-4 outline-none w-full rounded-md focus:ring-2 focus:ring-gray-400 ring-1 ring-gray-400"
        />
      </div>

      <div>
        <MyButton
          isLoading={isLoading}
          disabled={!text}
          variant="main"
          onClick={() => withLoading(createCommentHandler)}
        >
          Comment
        </MyButton>
      </div>
    </div>
  )
}
