import React, { useRef } from 'react'

import { useOutsideClick } from '../hooks'

type PropsType = {
  children: React.ReactNode
  onOutsideClick: () => void
}

const OutsideClick = (props: PropsType) => {
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, props.onOutsideClick)

  return <div ref={wrapperRef}>{props.children}</div>
}

export default OutsideClick
