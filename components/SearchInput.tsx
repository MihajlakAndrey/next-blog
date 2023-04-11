import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useSearch } from '../hooks'
import { Api } from '../services'
import { truncateString } from '../lib/utils/TruncateString'
import OutsideClick from './OutsideClick'

const debounce = (cb: (args?: any) => any, delay: number) => {
  let timeout: any

  return (...args: any) => {
    let callback = () => {
      cb.apply(this, args)
    }
    clearTimeout(timeout)

    timeout = setTimeout(callback, delay)
  }
}

const SearchInput = () => {
  const { titleHandler, activeTitle } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [searchResultVisible, setSearchResultVisible] = useState<boolean>(false)
  const [searchPostsResult, setSearchPostsResult] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const fetchSerchResults = async (text: string) => {
    try {
      const { data: posts } = await Api().posts.getAllPosts(`title=${text}`)
      const postResults = Array.from(new Set(posts.map((item) => item.title)))
      setSearchPostsResult(postResults)
      if (posts.length > 0) {
        setSearchResultVisible(true)
      }
    } catch (error) {
      console.log(error)
      alert('Error')
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedFetch = useCallback(debounce(fetchSerchResults, 400), [])

  const inputHandler = async (text: string) => {
    setInputValue(text)
    setIsLoading(true)
    debouncedFetch(text)
  }

  const searchBtnClickHandler = async () => {
    inputValue.length > 0 && titleHandler(inputValue)
  }

  const resultItemClickHandler = async (title: string) => {
    titleHandler(title)
    setSearchResultVisible(false)
  }

  const searchResOutsideClickHandler = () => {
    setSearchResultVisible(false)
  }

  useEffect(() => {
    setInputValue(activeTitle as string)
  }, [activeTitle])

  return (
    <div className="relative sm:static w-full">
      <div className="relative w-full ">
        <input
          ref={inputRef}
          type="search"
          className="p-2.5 w-80 sm:w-full text-sm pr-11 text-gray-900 bg-gray-50 rounded-lg lg:rounded-r-lg xl:rounded-l-none  border-l-gray-50 border-l-2 border border-gray-300 focus:border-blue-500 focus:outline-0"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => inputHandler(e.target.value)}
        />
        <button
          onClick={searchBtnClickHandler}
          type="button"
          className="absolute top-0 right-0 p-2 text-sm font-medium hover:from-blue-100 hover:to-indigo-100 bg-gradient-to-r
         from-blue-500 to-indigo-500  rounded-r-lg border border-blue-500 "
        >
          <SearchSvg />
        </button>
      </div>

      <OutsideClick onOutsideClick={searchResOutsideClickHandler}>
        <div
          hidden={!searchResultVisible && !isLoading}
          className="absolute w-full sm:top-14 sm:right-0  bg-white border shadow max-h-96 overflow-y-auto overflow-x-hidden"
        >
          <ul>
            {isLoading ? (
              <li className="text-xl text-center p-2 cursor-pointer font-bold">
                <span className=" inline-block animate-spin "> &#9696;</span>
              </li>
            ) : (
              searchPostsResult.map((item) => (
                <li
                  onClick={() => resultItemClickHandler(item)}
                  className="hover:bg-slate-50 cursor-pointer font-semibold p-2 flex items-center"
                  key={item}
                >
                  <div>
                    <SearchSvg />
                  </div>
                  <span className="pl-2">{truncateString(item, 64)}</span>
                </li>
              ))
            )}

            {!isLoading && (
              <li
                className="sm:block hidden hover:bg-slate-50 text-center p-2 cursor-pointer font-bold"
                onClick={() => setSearchResultVisible(false)}
              >
                &#x2715;
              </li>
            )}
          </ul>
        </div>
      </OutsideClick>
    </div>
  )
}

export default SearchInput

const SearchSvg = React.memo(() => {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  )
})
