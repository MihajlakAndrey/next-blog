import React, { createContext, useEffect, useState } from 'react'

import { Api } from '../services'
import { PostType } from '../types'
import Header from './Header'
import SideMenu from './SideMenu'

type PropsType = {
  children: JSX.Element | JSX.Element[]
}

export type SideContexType = {
  tags: string[]
  recentPosts: PostType[]
  addRecentPostHandler: (post: PostType) => void
  fetchTags: () => void
}
export const SideContex = createContext<SideContexType | null>(null)

const Layout = ({ children }: PropsType) => {
  const [tags, setTags] = useState<string[]>([])
  const [recentPosts, setRecentPosts] = useState<PostType[]>([])

  const fetchTags = async () => {
    try {
      const { data: tags } = await Api().posts.getAllTags()
      setTags(tags)
    } catch (error) {
      alert('Fail to get tags')
      setTags([])
    }
  }

  const addRecentPostHandler = (post: PostType) => {
    if (recentPosts.filter((e) => e._id === post._id).length > 0) {
      return
    }
    if (recentPosts.length === 3) {
      recentPosts.shift()
      setRecentPosts(recentPosts)
    }
    setRecentPosts([...recentPosts, post])
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <>
      <SideContex.Provider
        value={{ tags, recentPosts, addRecentPostHandler, fetchTags }}
      >
        <Header />
        <div className="flex bg-slate-100">
          <div className=" w-64 bg-white xl:hidden border-r min-h-screen ">
            <SideMenu />
          </div>

          <div className="mx-auto p-4 sm:p-0 sm:m-0 max-w-7xl w-full flex-1 min-h-screen ">
            {children}
          </div>
        </div>
      </SideContex.Provider>
    </>
  )
}

export default Layout
