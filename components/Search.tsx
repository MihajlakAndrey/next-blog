import React from 'react'

import SideMenuDropdown from './SideMenuDropdown'
import SearchInput from './SearchInput'

const Search = () => {
  return (
    <div className="flex">
      <div className="xl:block hidden">
        <SideMenuDropdown />
      </div>
      <SearchInput />
    </div>
  )
}

export default Search
