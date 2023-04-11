import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import HomePage from '../../pages/index'
import { SessionProvider } from 'next-auth/react'
import { mockPosts } from '../../__mocks__/mock-data'


const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('HomePage', () => {
  test('renders homepage correctly', async () => {
    useRouter.mockImplementation(() => ({
      query: { title: '', tag: '', sort: '' },
    }))

    render(
      <SessionProvider session={{ user: null, expires: '' }}>
        <HomePage posts={mockPosts} />
      </SessionProvider>
    )

    const posts = screen.getAllByRole('post')
    expect(posts.length).toBe(3)
  })
})
