import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ProfilePage from '../../pages/profile'
import { SessionProvider } from 'next-auth/react'
import { mockUser } from '../../__mocks__/mock-data'


describe('ProfilePage', () => {
  test('renders correctly when signed in with credentials', async () => {
    render(
      <SessionProvider
        session={{
          expires: '42',
          user: { ...mockUser, provider: 'credentials' } as any,
        }}
      >
        <ProfilePage />
      </SessionProvider>
    )

    const name = await screen.findByText(mockUser.name)
    const commentCount = await screen.findByText(
      `Comment count - ${mockUser.commentCount}`
    )
    const postCount = await screen.findByText(
      `Comment count - ${mockUser.postCount}`
    )

    expect(name).toBeInTheDocument()
    expect(commentCount).toBeInTheDocument()
    expect(postCount).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
  })

  test('renders correctly when signed in with github', async () => {
    render(
      <SessionProvider
        session={{
          expires: '42',
          user: { ...mockUser, provider: 'github' } as any,
        }}
      >
        <ProfilePage />
      </SessionProvider>
    )

    const name = await screen.findByText(mockUser.name)
    const commentCount = await screen.findByText(
      `Comment count - ${mockUser.commentCount}`
    )
    const postCount = await screen.findByText(
      `Comment count - ${mockUser.postCount}`
    )

    expect(name).toBeInTheDocument()
    expect(commentCount).toBeInTheDocument()
    expect(postCount).toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })
})
