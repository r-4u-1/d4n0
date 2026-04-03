import { render, screen, fireEvent } from '@testing-library/react'
import { Showreel } from '@/components/Showreel/Showreel'
import { ThemeProvider } from '@/context/ThemeContext'

function renderShowreel() {
  return render(
    <ThemeProvider>
      <Showreel />
    </ThemeProvider>
  )
}

describe('Showreel', () => {
  it('renders the showreel label', () => {
    renderShowreel()
    expect(screen.getByText(/showreel 2024/i)).toBeInTheDocument()
  })

  it('renders the play button', () => {
    renderShowreel()
    expect(screen.getByRole('button', { name: /watch showreel/i })).toBeInTheDocument()
  })

  it('opens modal when play button clicked', () => {
    renderShowreel()
    fireEvent.click(screen.getByRole('button', { name: /watch showreel/i }))
    expect(screen.getByRole('dialog', { name: /showreel video/i })).toBeInTheDocument()
  })

  it('closes modal when close button clicked', () => {
    renderShowreel()
    fireEvent.click(screen.getByRole('button', { name: /watch showreel/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /close showreel/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes modal when overlay is clicked', () => {
    renderShowreel()
    fireEvent.click(screen.getByRole('button', { name: /watch showreel/i }))
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders ticker items', () => {
    renderShowreel()
    expect(screen.getAllByText(/echoes of light/i).length).toBeGreaterThan(0)
  })
})
