import React from 'react'

import { useSearch } from '../../hooks'
import { truncateString } from '../../lib/utils/TruncateString'

const PostTags = (props: { tags: string[] }) => {
  const { tagHandler } = useSearch()

  return (
    <div className="flex flex-wrap py-2 ">
      {props.tags.map((tag: string) => (
        <span
          onClick={() => tagHandler(tag)}
          key={tag}
          className="text-gray-400 mr-3 hover:text-gray-900 cursor-pointer "
        >
          #{truncateString(tag, 20)}
        </span>
      ))}
    </div>
  )
}

export default PostTags
