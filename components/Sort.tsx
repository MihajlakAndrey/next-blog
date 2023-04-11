import React from 'react'

import { useSearch } from '../hooks'

type ObjType = { [key: string]: string }

const sortItems: ObjType = {
  'New': 'createdAt',
  'Popular': 'viewsCount',
  'Most discussed': 'comments',
}

const getKeyByValue = (object: ObjType, value: string) => {
  return Object.keys(object).find((key) => object[key] === value)
}

const Sort = () => {
  const { sortHandler, activeSort } = useSearch()

  return (
    <div className="py-2  ">
      <h1 className=" font-bold pb-2 px-4">Sort by:</h1>
      <div>
        {Object.keys(sortItems).map((item) => (
          <p
            key={item}
            onClick={() => sortHandler(sortItems[item])}
            className={`${
              getKeyByValue(sortItems, activeSort as string) === item &&
              `text-blue-500 bg-slate-100 font-bold`
            }  hover:bg-slate-100 px-4 cursor-pointer`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sort
