import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SessionProvider } from 'next-auth/react'
import ReactDOM from 'react-dom'

import { mockUser } from '../../__mocks__/mock-data'
import Login from '../../components/Login'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Login', () => {
  beforeAll(() => {
    //@ts-ignore
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element
    })
  })

  afterEach(() => {
    //@ts-ignore
    ReactDOM.createPortal.mockClear()
  })

  useRouter.mockImplementation(() => ({
    query: { title: '', tag: '', sort: '' },
  }))

  test('renders userdropdown when signed in', async () => {
    render(
      <SessionProvider
        session={{
          expires: '42',
          user: { ...mockUser, provider: 'credentials' } as any,
        }}
      >
        <Login />
      </SessionProvider>
    )

    const userDropDown = await screen.findByRole(`dropdown`)
    const loginButton = await screen.queryByRole(`loginButton`)
    expect(loginButton).not.toBeInTheDocument()
    expect(userDropDown).toBeInTheDocument()
  })
  test('renders login button when signed out', async () => {
    render(
      <SessionProvider session={null}>
        <Login />
      </SessionProvider>
    )

    const loginButton = await screen.queryByRole(`loginButton`)
    const userDropDown = await screen.queryByRole(`dropdown`)
    expect(loginButton).toBeInTheDocument()
    expect(userDropDown).not.toBeInTheDocument()
  })
})
