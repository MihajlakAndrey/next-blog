import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { createURLSearchParams } from '../lib/utils/CreateURLSearchParams'

const useSearch = () => {
  
  const router = useRouter()
  const { title = '', tag = '', sort = 'createdAt' } = router.query

  useEffect(() => {
    setActiveTag(tag)
    setActiveSort(sort)
    setActiveTitle(title)
  }, [router.query])

  const [activeTag, setActiveTag] = useState(tag)
  const [activeSort, setActiveSort] = useState(sort)
  const [activeTitle, setActiveTitle] = useState(title)

  const filterSearch = ({ title, tag, sort }: { [key: string]: string }) => {
    let query = router.query

    if (query.id) query = {}

    if (title) {
      query.title = title
      query.tag = ''
    }
    if (tag) {
      query.title = ''
      query.tag = tag
    }
    if (sort) query.sort = sort

    router.push({
      pathname: '/',
      query: createURLSearchParams(query),
    })
  }

  const sortHandler = (value: string) => {
    filterSearch({ sort: value })
  }
  const titleHandler = (value: string) => {
    filterSearch({ title: value })
  }
  const tagHandler = (value: string) => {
    if (value === activeTag) {
      return router.push({
        pathname: '/',
        query: createURLSearchParams({ sort: activeSort }),
      })
    }
    filterSearch({ tag: value })
  }

  return {
    sortHandler,
    titleHandler,
    tagHandler,
    activeSort,
    activeTag,
    activeTitle,
  }
}

export default useSearch
