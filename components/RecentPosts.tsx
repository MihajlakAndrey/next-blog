import React, { memo, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { truncateString } from '../lib/utils/TruncateString'
import { SideContex } from './Layout'

const RecentPosts = memo(() => {
  const context = useContext(SideContex)

  if (context?.recentPosts.length === 0) {
    return <></>
  }
  return (
    <div className="flex flex-col py-2 ">
      <h1 className="font-bold pb-2 px-4">Recent posts:</h1>

      {context?.recentPosts.map((item) => (
        <Link
          key={item._id}
          href={`/post/${item._id}`}
          className="hover:bg-slate-100 px-4 cursor-pointer p-2 "
        >
          <Image
            src={item.owner.image || '/defaultUser.png'}
            alt="user_avatar"
            width={20}
            height={20}
            className="h-6 w-6 inline-block rounded-full object-cover mr-2"
          />
          <span>{truncateString(item.owner.name, 14)}</span>

          <p key={item._id} className="font-semibold ">
            {truncateString(item.title, 22)}
          </p>
        </Link>
      ))}
    </div>
  )
})

export default RecentPosts
