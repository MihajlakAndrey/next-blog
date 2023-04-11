import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import Modal from './Modal'
import UserDropdown from './UserDropdown'
import SignUpForm from './Forms/SignUpForm'
import LoginForm from './Forms/LoginForm'

const Login = () => {
  const { status } = useSession()

  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false)
  const [formType, setFormType] = useState<'login' | 'signup'>('login')

  if (status === 'authenticated') {
    return <UserDropdown />
  }

  return (
    <>
      <button
        role="loginButton"
        onClick={() => setIsFormOpen(true)}
        className=" flex gap-2 items-center cursor-pointer rounded-md hover:bg-gray-50 ssm:p-0 px-2"
      >
        <Image src={'/logIn.svg'} width={40} height={40} alt="login" />
        <span className="ssm:hidden font-semibold">Log In</span>
      </button>

      <Modal onClose={() => setIsFormOpen(false)} show={isFormOpen}>
        <>
          {formType === 'signup' && (
            <SignUpForm
              setIsFormOpen={setIsFormOpen}
              setFormType={setFormType}
            />
          )}
          {formType === 'login' && (
            <LoginForm
              setIsFormOpen={setIsFormOpen}
              setFormType={setFormType}
            />
          )}
        </>
      </Modal>
    </>
  )
}

export default Login
