import Image from 'next/image'
import React, { memo, useEffect, useState } from 'react'

import { UserType } from '../../types'

export const CreationInfo = memo(
  (props: { owner: UserType; created: string }) => {
    const { owner, created } = props
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
      setTime(new Date(created).toLocaleTimeString())
      setDate(new Date(created).toDateString())
    }, [])

    return (
      <div className=" w-full flex gap-5 p-3">
        <Image
          src={owner.image || '/defaultUser.png'}
          alt="user_avatar"
          width={120}
          height={120}
          className="h-12 w-12 bg-gray-800 inline-block rounded-full object-cover"
        />

        <div className="flex flex-col">
          <p className="font-semibold">{owner.name}</p>
          <p className="text-gray-400">{date + ' ' + time}</p>
        </div>
      </div>
    )
  }
)

export const ViewCommentInfo = memo(
  (props: { viewsCount: number; commentsLength: number }) => {
    const { viewsCount, commentsLength } = props

    return (
      <div className="flex pb-2">
        <div className="flex items-center gap-2">
          <Image width={30} height={30} alt="views" src={'/views.svg'} />
          <span> {viewsCount} </span>
        </div>
        <div className="ml-5 flex items-center gap-2">
          <Image width={30} height={30} alt="comment" src={'/comment.svg'} />
          <span> {commentsLength} </span>
        </div>
      </div>
    )
  }
)
