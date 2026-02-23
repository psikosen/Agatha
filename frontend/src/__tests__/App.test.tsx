import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the dashboard header', () => {
    render(<App />)
    expect(screen.getByText('GSAD')).toBeDefined()
  })

  it('renders the grid dashboard container', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.gsad-app')).toBeDefined()
  })
})
