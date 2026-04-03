import { test, expect } from '@playwright/test'

test.describe('Hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hero section is visible on load', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible()
  })

  test('director name is displayed', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Alexandre')
  })

  test('View Projects CTA scrolls to projects', async ({ page }) => {
    await page.getByRole('button', { name: /view projects/i }).click()
    await page.waitForTimeout(900)
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('Watch Showreel button opens modal', async ({ page }) => {
    await page.getByRole('button', { name: /watch showreel/i }).first().click()
    await expect(page.getByRole('dialog', { name: /showreel video/i })).toBeVisible()
  })
})

test.describe('Showreel strip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('showreel strip is visible', async ({ page }) => {
    await expect(page.getByRole('region', { name: /showreel/i })).toBeVisible()
  })

  test('play button opens modal', async ({ page }) => {
    await page.getByRole('button', { name: /watch showreel video/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('modal closes when close button clicked', async ({ page }) => {
    await page.getByRole('button', { name: /watch showreel video/i }).click()
    await page.getByRole('button', { name: /close showreel/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})
