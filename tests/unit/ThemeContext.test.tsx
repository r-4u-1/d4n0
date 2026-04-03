import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to dark theme', () => {
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('toggles from dark to light', () => {
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('toggles back to dark', () => {
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    const btn = screen.getByRole('button', { name: 'Toggle' })
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('persists theme to localStorage', () => {
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(window.localStorage.getItem('noir-theme')).toBe('light')
  })

  it('reads theme from localStorage on init', () => {
    window.localStorage.setItem('noir-theme', 'light')
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('sets data-theme attribute on documentElement', () => {
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('throws when useTheme is used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow('useTheme must be used within ThemeProvider')
    spy.mockRestore()
  })
})
