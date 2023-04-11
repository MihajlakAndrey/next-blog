import { AxiosInstance } from 'axios'

import { CommentType } from '../types'

export const CommentApi = (axiosInstance: AxiosInstance) => ({
  async deleteComment(commentId: string) {
    const data = await axiosInstance.delete(`/api/comment`, {
      data: {
        _id: commentId,
      },
    })
    return data
  },
  async createComment(postId: string, text: string) {
    const data = await axiosInstance.post<CommentType>(`/api/comment/${postId}`, {
      text,
    })
    return data
  },
})
