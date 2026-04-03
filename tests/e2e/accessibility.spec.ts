import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('skip link is present and becomes visible on focus', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()
    await skipLink.focus()
    await expect(skipLink).toBeVisible()
  })

  test('skip link targets main element', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toHaveAttribute('href', '#main-content')
    await expect(page.locator('#main-content')).toBeAttached()
  })

  test('page has a single h1', async ({ page }) => {
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
  })

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt!.length).toBeGreaterThan(0)
    }
  })

  test('nav has aria-label', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: /main navigation/i })).toBeAttached()
  })

  test('footer has contentinfo role', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeAttached()
  })

  test('form inputs have associated labels', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded()
    const inputs = page.locator('#contact input, #contact textarea, #contact select')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      const id = await inputs.nth(i).getAttribute('id')
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeAttached()
      }
    }
  })

  test('interactive elements are keyboard focusable', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeAttached()
  })

  test('gallery filter buttons have aria-pressed state', async ({ page }) => {
    await page.locator('#gallery').scrollIntoViewIfNeeded()
    const filterBtns = page.locator('#gallery [aria-pressed]')
    const count = await filterBtns.count()
    expect(count).toBeGreaterThan(0)
  })

  test('mobile menu has aria-modal when open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.getByRole('button', { name: /open menu/i }).click()
    const dialog = page.getByRole('dialog', { name: /mobile navigation/i })
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  test('theme toggle button has descriptive aria-label', async ({ page }) => {
    const btn = page.getByRole('button', { name: /switch to (light|dark) mode/i })
    await expect(btn).toBeAttached()
  })
})
