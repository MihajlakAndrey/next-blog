import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Api } from '../../services'
import { SideContex } from '../Layout'

const PostButtons = (props: { id: string }) => {
  const { id } = props

  const context = useContext(SideContex)
  const router = useRouter()

  const deletePostHandler = async () => {
    if (window.confirm('Delete post?')) {
      try {
        await Api().posts.deletePost(id)
        context?.fetchTags()
        router.push(`/`)
      } catch (error) {
        console.log(error)
        alert('Failer to delete post')
      }
    }
  }

  const editPostHandler = () => {
    router.push(`/create/${id}`)
  }

  return (
    <div className="absolute top-0 right-0 flex  gap-2 p-1">
      <button
        onClick={editPostHandler}
        className="hover:bg-gray-100 rounded-md p-1 h-10 w-10 text-2xl bg-white bg-opacity-50"
      >
        &#x270F;
      </button>
      <button
        onClick={deletePostHandler}
        className="hover:bg-gray-100 rounded-md p-1 h-10 w-10 text-2xl font-bold bg-white bg-opacity-50 "
      >
        &#x2715;
      </button>
    </div>
  )
}

export default PostButtons
