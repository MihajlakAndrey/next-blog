import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostPage from '../../../pages/post/[id]'
import { SessionProvider } from 'next-auth/react'
import { mockPost, mockUser } from '../../../__mocks__/mock-data'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('PostPage', () => {
  useRouter.mockImplementation(() => ({
    query: { title: '', tag: '', sort: '' },
  }))
  test('comment form must not be in document when user not authorized', async () => {
    render(
      <SessionProvider
        session={{
          expires: '42',
          user: null,
        }}
      >
        <PostPage post={mockPost} />
      </SessionProvider>
    )

    const fullpost = screen.getByRole('post')
    const commentForm = screen.queryByRole('commentForm')
    expect(fullpost).toBeInTheDocument()
    expect(commentForm).not.toBeInTheDocument()
  })

  test('comment form must be in document when user authorized', async () => {
    render(
      <SessionProvider
        session={{
          expires: '42',
          user: { ...mockUser, provider: 'credentiols' },
        }}
      >
        <PostPage post={mockPost} />
      </SessionProvider>
    )

    const fullpost = screen.getByRole('post')
    const commentForm = screen.queryByRole('commentForm')
    expect(fullpost).toBeInTheDocument()
    expect(commentForm).toBeInTheDocument()
  })
})
