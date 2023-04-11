import React from 'react'
import Router from 'next/router'
import Image from 'next/image'

import Login from './Login'
import Search from './Search'

const Header = () => {
  return (
    <div className="flex justify-between gap-3 p-2 sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center gap-3 ">
        <Image
          width={42}
          height={42}
          src={'/home.svg'}
          onClick={() => Router.push('/')}
          alt="Home"
          className="p-1 sm:p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md sm:rounded-full
        hover:from-blue-100 hover:to-indigo-100  cursor-pointer "
        />
        <Search />
      </div>
      <Login />
    </div>
  )
}

export default Header
