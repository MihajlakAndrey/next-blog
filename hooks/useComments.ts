import { useState } from 'react'

import { Api } from '../services'
import { CommentType } from '../types'

const useComments = (initialComments?: CommentType[]) => {
  const [comments, setComments] = useState(
    initialComments ? initialComments : []
  )

  const deleteCommentHandler = async (commentId: string) => {
    if (window.confirm('Delete comment?')) {
      try {
        await Api().comment.deleteComment(commentId)
        setComments(
          comments.filter((item: CommentType) => item._id !== commentId)
        )
      } catch (error) {
        alert('Failed to delete comment')
      }
    }
  }

  const createCommentHandler = async (postId: string, text: string) => {
    try {
      const { data: newComment } = await Api().comment.createComment(
        postId,
        text
      )
      setComments([newComment, ...comments])
    } catch (error) {
      alert('Failed to add comment')
    }
  }

  return {
    comments,
    createCommentHandler,
    deleteCommentHandler,
  }
}

export default useComments
