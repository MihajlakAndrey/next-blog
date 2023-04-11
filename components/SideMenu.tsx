import Link from 'next/link'
import React from 'react'

import RecentPosts from './RecentPosts'
import Sort from './Sort'
import Tags from './Tags'

const SideMenu = React.memo(() => {
  return (
    <div className="sticky top-16">
      <Sort />
      <RecentPosts />
      <Tags />
      <hr />

      <div className="italic py-2 px-4  flex flex-col items-center ">
        <span>2023 NextJs-Blog</span>
        <Link
          target="_blank"
          className="text-blue-400 hover:border-b"
          href={`https://github.com/tryHonestly/nextJs-blog`}
        >
          GitHub repository
        </Link>
      </div>
    </div>
  )
})

export default SideMenu
