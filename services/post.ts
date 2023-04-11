import { AxiosInstance } from 'axios'

import { PostType } from '../types'

export const PostApi = (axiosInstance: AxiosInstance) => ({
  async getAllPosts(URLSearchParams?: string) {
    const url =
      URLSearchParams === undefined
        ? `/api/posts`
        : `/api/posts?${URLSearchParams}`
    const data = await axiosInstance.get<PostType[]>(url)
    return data
  },
  async getAllTags() {
    const data = await axiosInstance.get<string[]>(`/api/tags`)
    return data
  },
  async getOnePost(postId: string) {
    const data = await axiosInstance.get<PostType>(`/api/post/${postId}`)
    return data
  },
  async updatePost(
    postId: string,
    postData: { title: string; text: string; tags: string[]; image?: string }
  ) {
    const data = await axiosInstance.patch<PostType>(
      `/api/post/edit/${postId}`,
      { ...postData }
    )
    return data
  },
  async createPost(postData: {
    title: string
    text: string
    tags: string[]
    image?: string
  }) {
    const data = await axiosInstance.post<PostType>(`/api/post/edit/`, {
      ...postData,
    })
    return data
  },
  async deletePost(postId: string) {
    const data = await axiosInstance.delete(`/api/post/edit/${postId}`, {
      data: {},
    })
    return data
  },
})
