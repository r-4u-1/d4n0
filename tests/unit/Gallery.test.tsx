import { render, screen, fireEvent, within } from '@testing-library/react'
import { Gallery } from '@/components/Gallery/Gallery'
import { ThemeProvider } from '@/context/ThemeContext'
import { GALLERY_ITEMS } from '@/data'

function renderGallery() {
  return render(
    <ThemeProvider>
      <Gallery />
    </ThemeProvider>
  )
}

describe('Gallery', () => {
  it('renders the section heading', () => {
    renderGallery()
    expect(screen.getByRole('heading', { name: /stills & footage/i })).toBeInTheDocument()
  })

  it('renders all gallery items by default', () => {
    renderGallery()
    GALLERY_ITEMS.forEach(item => {
      expect(screen.getByAltText(item.imageAlt)).toBeInTheDocument()
    })
  })

  it('renders filter buttons for each category', () => {
    renderGallery()
    const filterGroup = screen.getByRole('group', { name: /filter gallery/i })
    expect(within(filterGroup).getByRole('button', { name: /all/i })).toBeInTheDocument()
    expect(within(filterGroup).getByRole('button', { name: /narrative/i })).toBeInTheDocument()
    expect(within(filterGroup).getByRole('button', { name: /commercial/i })).toBeInTheDocument()
    expect(within(filterGroup).getByRole('button', { name: /school/i })).toBeInTheDocument()
    expect(within(filterGroup).getByRole('button', { name: /bts/i })).toBeInTheDocument()
  })

  it('All filter is active by default', () => {
    renderGallery()
    expect(screen.getByRole('button', { name: /all/i })).toHaveAttribute('aria-pressed', 'true')
  })

  it('filters items when a category is selected', () => {
    renderGallery()
    fireEvent.click(screen.getByRole('button', { name: /bts/i }))
    const btsItems = GALLERY_ITEMS.filter(i => i.category === 'BTS')
    const nonBtsItems = GALLERY_ITEMS.filter(i => i.category !== 'BTS')
    btsItems.forEach(item => {
      expect(screen.getByAltText(item.imageAlt)).toBeInTheDocument()
    })
    nonBtsItems.forEach(item => {
      expect(screen.queryByAltText(item.imageAlt)).not.toBeInTheDocument()
    })
  })

  it('sets aria-pressed correctly when filter changes', () => {
    renderGallery()
    fireEvent.click(screen.getByRole('button', { name: /narrative/i }))
    expect(screen.getByRole('button', { name: /narrative/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /all/i })).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows all items when All filter clicked after filtering', () => {
    renderGallery()
    fireEvent.click(screen.getByRole('button', { name: /bts/i }))
    fireEvent.click(screen.getByRole('button', { name: /all/i }))
    expect(screen.getAllByRole('article')).toHaveLength(GALLERY_ITEMS.length)
  })

  it('renders sort dropdown', () => {
    renderGallery()
    expect(screen.getByRole('combobox', { name: /sort gallery/i })).toBeInTheDocument()
  })

  it('renders play buttons for video items', () => {
    renderGallery()
    const videoItems = GALLERY_ITEMS.filter(i => i.type === 'video')
    const playBtns = screen.getAllByRole('button', { name: /play video/i })
    expect(playBtns).toHaveLength(videoItems.length)
  })

  it('images have lazy loading', () => {
    renderGallery()
    const images = screen.getAllByRole('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })
})
