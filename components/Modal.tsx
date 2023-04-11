import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type PropsType = {
  show: boolean
  children: React.ReactNode
  onClose: () => void
}

const Modal = (props: PropsType) => {
  const { show, onClose, children } = props
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [show])

  const modalContent = show ? (
    <div
      onClick={onClose}
      className="bg-black fixed top-0 left-0 w-full h-full bg-opacity-70 z-50 transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-full"
      >
        {children}
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLElement
    )
  } else {
    return null
  }
}

export default Modal
