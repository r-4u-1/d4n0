import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '@/components/Contact/Contact'
import { ThemeProvider } from '@/context/ThemeContext'

function renderContact() {
  return render(
    <ThemeProvider>
      <Contact />
    </ThemeProvider>
  )
}

describe('Contact', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the section heading', () => {
    renderContact()
    expect(screen.getByRole('heading', { name: /let's make something/i })).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    renderContact()
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    renderContact()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  it('shows email format error for invalid email', async () => {
    renderContact()
    await userEvent.type(screen.getByLabelText(/^name/i), 'Test User')
    await userEvent.type(screen.getByLabelText(/^email/i), 'notanemail')
    await userEvent.type(screen.getByLabelText(/^message/i), 'This is a test message')
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('clears field error when user starts typing', async () => {
    renderContact()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => expect(screen.getByText(/name is required/i)).toBeInTheDocument())
    await userEvent.type(screen.getByLabelText(/^name/i), 'A')
    await waitFor(() => expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument())
  })

  it('shows success state after valid submission', async () => {
    renderContact()
    await userEvent.type(screen.getByLabelText(/^name/i), 'Dano')
    await userEvent.type(screen.getByLabelText(/^email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/^message/i), 'I would love to collaborate on a film project.')
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('disables submit button while submitting', async () => {
    renderContact()
    await userEvent.type(screen.getByLabelText(/^name/i), 'Dano')
    await userEvent.type(screen.getByLabelText(/^email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/^message/i), 'A valid message here.')
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    })
  })

  it('has aria-required on required inputs', () => {
    renderContact()
    expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/^email/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/^message/i)).toHaveAttribute('aria-required', 'true')
  })

  it('sets aria-invalid on fields with errors', async () => {
    renderContact()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('renders contact details', () => {
    renderContact()
    expect(screen.getByText(/Dano@B\.studio/i)).toBeInTheDocument()
    expect(screen.getByText(/stockholm/i)).toBeInTheDocument()
  })

  it('renders social links', () => {
    renderContact()
    const nav = screen.getByRole('navigation', { name: /social media links/i })
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveTextContent('Instagram')
    expect(nav).toHaveTextContent('Vimeo')
  })
})
