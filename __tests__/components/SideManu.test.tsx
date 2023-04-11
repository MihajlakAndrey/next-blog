import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { mockPost } from '../../__mocks__/mock-data'
import { SideContex } from '../../components/Layout'
import SideMenu from '../../components/SideMenu'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SideMenu', () => {
  useRouter.mockImplementation(() => ({
    query: { title: '', tag: '', sort: '' },
  }))

  test('renders side menu correctly', async () => {
    const tags = ['first', 'second']
    const recentPosts: any = [mockPost]
    const addRecentPostHandler = jest.fn()
    const fetchTags = jest.fn()
    render(
      <SideContex.Provider
        value={{ tags, recentPosts, addRecentPostHandler, fetchTags }}
      >
        <SideMenu />
      </SideContex.Provider>
    )
    expect(await screen.findByText(/first/i)).toBeInTheDocument()
    expect(await screen.findByText(/second/i)).toBeInTheDocument()
    expect(await screen.findByText(mockPost.title)).toBeInTheDocument()
  })
})
