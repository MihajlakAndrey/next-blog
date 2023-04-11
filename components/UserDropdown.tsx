import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'

import { truncateString } from '../lib/utils/TruncateString'
import OutsideClick from './OutsideClick'

const UserDropdown = () => {
  const { data } = useSession()
  const router = useRouter()

  const [isOpen, setIsOpen] = React.useState(false)

  const outsideClickHandler = () => {
    setIsOpen(false)
  }

  return (
    <OutsideClick onOutsideClick={outsideClickHandler}>
      <div role="dropdown" className="relative z-50">
        <div className="w-11">
          <Image
            src={'/burger.svg'}
            width={43}
            height={43}
            alt="burger"
            onClick={() => setIsOpen(!isOpen)}
            className="hidden sm:block p-1 hover:bg-slate-100 rounded-full cursor-pointer "
          />
        </div>

        <div className="sm:hidden">
          <Image
            width={140}
            height={140}
            src={data?.user?.image || '/defaultUser.png'}
            alt="userAvatar"
            className="h-10 w-10 rounded-full object-cover inline-block"
          />

          <Image
            src={'/arrowDown.svg'}
            width={25}
            height={25}
            alt="arrow"
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isOpen ? 'rotate-180' : 'rotate-0'
            } transition-all  inline-block ml-2`}
          />
        </div>

        <div
          hidden={!isOpen}
          className={`absolute right-0 bg-white w-48 border-b shadow border`}
        >
          <div className="py-1 px-4  border-b ">
            <p className=" text-lg">Signed in as </p>
            <p className=" text-lg font-bold">
              {truncateString(data?.user?.name || '', 14)}
            </p>
          </div>

          <button
            onClick={() => router.push('/create')}
            className="py-2 px-3  hover:bg-slate-100 flex  items-center gap-4 w-full text-2xl "
          >
            <Image src={`/newPost.svg`} width={30} height={30} alt="New post" />
            New post
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="py-2 px-3 hover:bg-slate-100 flex  items-center gap-4 w-full text-2xl "
          >
            <Image src={`/profile.svg`} width={30} height={30} alt="Profile" />
            Profile
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="py-2 px-3 hover:bg-slate-100 flex  items-center gap-4 w-full text-2xl "
          >
            <Image src={`/logOut.svg`} width={30} height={30} alt="Log Out" />
            Log Out
          </button>
        </div>
      </div>
    </OutsideClick>
  )
}

export default UserDropdown
