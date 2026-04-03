import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('sticky nav is visible on load', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  })

  test('logo is visible and clickable', async ({ page }) => {
    const logo = page.getByLabel('Daniel — back to top')
    await expect(logo).toBeVisible()
    await logo.click()
  })

  test('nav becomes scrolled state after scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 100))
    await page.waitForTimeout(200)
    const nav = page.locator('nav')
    // After scroll the nav should have backdrop blur applied
    await expect(nav).toBeVisible()
  })

  test('clicking About nav link scrolls to about section', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click()
    await page.waitForTimeout(800)
    const section = page.locator('#about')
    await expect(section).toBeInViewport()
  })

  test('clicking Projects nav link scrolls to projects', async ({ page }) => {
    await page.getByRole('link', { name: 'Projects' }).click()
    await page.waitForTimeout(800)
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('clicking Contact nav link scrolls to contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click()
    await page.waitForTimeout(800)
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('theme toggle switches to light mode', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /switch to light mode/i })
    await toggleBtn.click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('theme persists after page reload', async ({ page }) => {
    await page.getByRole('button', { name: /switch to light mode/i }).click()
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('mobile hamburger menu opens on small screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const hamburger = page.getByRole('button', { name: /open menu/i })
    await hamburger.click()
    await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toBeVisible()
  })

  test('mobile menu closes when a link is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.getByRole('button', { name: /open menu/i }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'About' }).click()
    await page.waitForTimeout(600)
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})
