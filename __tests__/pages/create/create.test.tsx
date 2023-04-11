import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CreatePage from '../../../pages/create/index'
import { mockPost } from '../../../__mocks__/mock-data'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Create/Edit Page', () => {
  
  test('edit page renders currently', async () => {
    render(<CreatePage post={mockPost} />)
    const image = document.querySelector('img') as HTMLImageElement
    const title = await screen.getByDisplayValue(mockPost.title)
    const tags = await screen.getByDisplayValue(mockPost.tags.join(' '))
    const text = await screen.findByText(mockPost.text)

    expect(image.src).toContain(mockPost.image)
    expect(image).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(tags).toBeInTheDocument()
    expect(title).toHaveValue(mockPost.title)
    expect(tags).toHaveValue(mockPost.tags.join(' '))
    expect(text).toHaveValue(mockPost.text)
  })
  test('create page renders currently', async () => {
    render(<CreatePage />)

    const title = await screen.getByRole(`title`)
    const tags = await screen.getByRole(`tags`)
    const text = await screen.getByRole(`textarea`)
    expect(title).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(tags).toBeInTheDocument()
    expect(title).toHaveValue('')
    expect(tags).toHaveValue('')
    expect(text).toHaveValue('')
  })
})
