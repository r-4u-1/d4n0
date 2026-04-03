import { test, expect } from '@playwright/test'

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('#gallery').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
  })

  test('all gallery items visible by default', async ({ page }) => {
    const items = page.locator('#gallery article')
    await expect(items).toHaveCount(6)
  })

  test('All filter button is active by default', async ({ page }) => {
    const allBtn = page.locator('#gallery').getByRole('button', { name: 'All' })
    await expect(allBtn).toHaveAttribute('aria-pressed', 'true')
  })

  test('filtering by BTS shows only BTS items', async ({ page }) => {
    await page.locator('#gallery').getByRole('button', { name: 'BTS' }).click()
    await page.waitForTimeout(400)
    const items = page.locator('#gallery article')
    const count = await items.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(6)
  })

  test('filtering by Narrative and then All restores all items', async ({ page }) => {
    await page.locator('#gallery').getByRole('button', { name: 'Narrative' }).click()
    await page.waitForTimeout(300)
    await page.locator('#gallery').getByRole('button', { name: 'All' }).click()
    await page.waitForTimeout(400)
    await expect(page.locator('#gallery article')).toHaveCount(6)
  })

  test('sort dropdown is accessible', async ({ page }) => {
    const select = page.getByRole('combobox', { name: /sort gallery/i })
    await expect(select).toBeVisible()
    await select.selectOption('Photos first')
    await expect(select).toHaveValue('Photos first')
  })

  test('video items have play buttons', async ({ page }) => {
    const playBtns = page.locator('#gallery').getByRole('button', { name: /play video/i })
    await expect(playBtns).toHaveCount(2)
  })
})
