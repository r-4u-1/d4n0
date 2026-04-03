import { test, expect } from '@playwright/test'

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByText(/name is required/i)).toBeVisible()
    await expect(page.getByText(/email is required/i)).toBeVisible()
    await expect(page.getByText(/message is required/i)).toBeVisible()
  })

  test('shows email format error for invalid email', async ({ page }) => {
    await page.getByLabel(/^name/i).fill('Test User')
    await page.getByLabel(/^email/i).fill('bademail')
    await page.getByLabel(/^message/i).fill('This is a long enough message')
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('submits successfully with valid data', async ({ page }) => {
    await page.getByLabel(/^name/i).fill('Alexandre')
    await page.getByLabel(/^email/i).fill('test@example.com')
    await page.getByLabel(/^subject/i).selectOption('Narrative Film')
    await page.getByLabel(/^message/i).fill('I would love to collaborate on a narrative film project together.')
    await page.getByRole('button', { name: /send message/i }).click()
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5000 })
  })

  test('subject dropdown has correct options', async ({ page }) => {
    const select = page.getByLabel(/^subject/i)
    await expect(select.locator('option', { hasText: 'Narrative Film' })).toHaveCount(1)
    await expect(select.locator('option', { hasText: 'School Production' })).toHaveCount(1)
    await expect(select.locator('option', { hasText: 'Corporate Film' })).toHaveCount(1)
    await expect(select.locator('option', { hasText: 'Collaboration' })).toHaveCount(1)
  })

  test('press kit download link is present', async ({ page }) => {
    const link = page.getByRole('link', { name: /download press kit/i })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('download')
  })
})
