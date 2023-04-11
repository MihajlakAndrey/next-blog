import React, { useState } from 'react'

import { useSearch } from '../hooks'
import { truncateString } from '../lib/utils/TruncateString'
import OutsideClick from './OutsideClick'
import RecentPosts from './RecentPosts'
import Sort from './Sort'
import Tags from './Tags'

const sortItems: { [key: string]: string } = {
  createdAt: 'New',
  viewsCount: 'Popular',
  comments: 'Discussed',
}

const SideMenuDropdown = () => {
  const { activeSort, activeTag } = useSearch()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownTitle = activeTag || sortItems[activeSort as string] || 'New'

  const outsideClickHandler = () => {
    setIsOpen(false)
  }

  return (
    <OutsideClick onOutsideClick={outsideClickHandler}>
      <div className="relative z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 "
          type="button"
        >
          {truncateString(dropdownTitle as string, 4)}
          <svg
            aria-hidden="true"
            className={`w-4 h-4 ml-1 transition-all ${isOpen && 'rotate-180'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          className="z-50 absolute top-10 sm:left-0 bg-white divide-y divide-gray-100 rounded border shadow w-max xl:text-xl "
          hidden={!isOpen}
        >
          <Sort />
          <RecentPosts />
          <Tags />
        </div>
      </div>
    </OutsideClick>
  )
}

export default SideMenuDropdown
