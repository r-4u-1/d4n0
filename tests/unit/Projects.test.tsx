import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/Projects/Projects'
import { ThemeProvider } from '@/context/ThemeContext'
import { PROJECTS } from '@/data'

function renderProjects() {
  return render(
    <ThemeProvider>
      <Projects />
    </ThemeProvider>
  )
}

describe('Projects', () => {
  it('renders the section heading', () => {
    renderProjects()
    expect(screen.getByRole('heading', { name: /selected work/i })).toBeInTheDocument()
  })

  it('renders all projects', () => {
    renderProjects()
    PROJECTS.forEach(p => {
      expect(screen.getByAltText(p.imageAlt)).toBeInTheDocument()
    })
  })

  it('renders project titles', () => {
    renderProjects()
    PROJECTS.forEach(p => {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0)
    })
  })

  it('renders project roles', () => {
    renderProjects()
    PROJECTS.forEach(p => {
      expect(screen.getByText(p.role)).toBeInTheDocument()
    })
  })

  it('renders project years', () => {
    renderProjects()
    PROJECTS.forEach(p => {
      expect(screen.getAllByText(String(p.year)).length).toBeGreaterThan(0)
    })
  })

  it('renders view case buttons for each project', () => {
    renderProjects()
    const viewBtns = screen.getAllByRole('button', { name: /view case study/i })
    expect(viewBtns).toHaveLength(PROJECTS.length)
  })

  it('images have lazy loading', () => {
    renderProjects()
    const images = screen.getAllByRole('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })

  it('each project is wrapped in an article', () => {
    renderProjects()
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(PROJECTS.length)
  })
})
