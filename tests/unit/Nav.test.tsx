import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Nav } from '@/components/Nav/Nav'
import { ThemeProvider } from '@/context/ThemeContext'

function renderNav() {
  return render(
    <ThemeProvider>
      <Nav />
    </ThemeProvider>
  )
}

describe('Nav', () => {
  it('renders the logo', () => {
    renderNav()
    expect(screen.getByLabelText(/Daniel/i)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    renderNav()
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  it('theme toggle switches label on click', () => {
    renderNav()
    const btn = screen.getByRole('button', { name: /switch to light mode/i })
    fireEvent.click(btn)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  it('renders hamburger button', () => {
    renderNav()
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('opens mobile menu on hamburger click', async () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('closes mobile menu on second click', () => {
    renderNav()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger)
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders CTA link', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /let's work/i })).toBeInTheDocument()
  })

  it('has correct nav landmark role', () => {
    renderNav()
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })
})
