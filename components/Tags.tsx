import React, { useContext } from 'react'

import { useSearch } from '../hooks'
import { truncateString } from '../lib/utils/TruncateString'
import { SideContex } from './Layout'

const Tags = () => {
  const { tagHandler, activeTag } = useSearch()
  const context = useContext(SideContex)

  if (context?.tags.length === 0) {
    return <></>
  }

  return (
    <div className="py-2 z-40">
      <h1 className="sm:pl-4 pb-2 font-bold px-4 ">Tags:</h1>
      <div className="max-h-96 overflow-y-hidden hover:overflow-y-auto xl:overflow-auto xl:max-h-40 ">
        {context?.tags.map((tag) => (
          <p
            onClick={() => tagHandler(tag)}
            key={tag}
            className={`${
              activeTag === tag ? `text-blue-500 font-bold` : ` text-slate-500 `
            } hover:bg-slate-100 px-4 cursor-pointer  `}
          >
            #{truncateString(tag, 20)}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Tags
