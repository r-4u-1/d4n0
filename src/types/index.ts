export type Theme = 'dark' | 'light'

export interface Project {
  id: string
  title: string
  year: number
  category: string
  role: string
  image: string
  imageAlt: string
  color: string
}

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  type: 'photo' | 'video'
  image: string
  imageAlt: string
  span?: 'wide' | 'tall' | 'normal'
}

export type GalleryCategory = 'All' | 'Narrative' | 'Commercial' | 'School' | 'BTS'

export interface Award {
  id: string
  name: string
  festival: string
  year: number
}

export interface NavLink {
  label: string
  href: string
}
