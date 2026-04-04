import { render, screen } from '@testing-library/react'
import { About } from '@/components/About/About'
import { ThemeProvider } from '@/context/ThemeContext'

function renderAbout() {
  return render(
    <ThemeProvider>
      <About />
    </ThemeProvider>
  )
}

describe('About', () => {
  it('renders the section heading', () => {
    renderAbout()
    expect(screen.getByRole('heading', { name: /the director/i })).toBeInTheDocument()
  })

  it('renders the portrait image with alt text', () => {
    renderAbout()
    expect(screen.getByAltText(/Daniel, film director/i)).toBeInTheDocument()
  })

  it('portrait image has lazy loading', () => {
    renderAbout()
    const img = screen.getByAltText(/Daniel, film director/i)
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('renders all three services', () => {
    renderAbout()
    expect(screen.getAllByText(/narrative film/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/education/i)).toBeInTheDocument()
    expect(screen.getByText(/corporate/i)).toBeInTheDocument()
  })

  it('renders press kit download link', () => {
    renderAbout()
    const link = screen.getByRole('link', { name: /download press kit/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('download')
    expect(link).toHaveAttribute('href', '/press-kit.pdf')
  })

  it('has correct section id for scroll spy', () => {
    renderAbout()
    expect(document.getElementById('about')).toBeInTheDocument()
  })

  it('has aria-labelledby pointing to heading', () => {
    renderAbout()
    const section = screen.getByRole('region', { name: /the director/i })
    expect(section).toBeInTheDocument()
  })
})
