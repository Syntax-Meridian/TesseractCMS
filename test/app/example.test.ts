import { test, expect } from '@playwright/test'

test('should navigate to the home page via home link', async ({ page }) => {
  // Start from the root page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an element with the text 'Syntax Meridian' and click on it
  await page.getByText('Syntax Meridian').click()
  // The new url should be "/" (baseURL is used there)
  await expect(page).toHaveURL('/')
  // The new page should contain a banner with "Syntax Meridian" name in it
  await expect(page.getByRole('banner')).toContainText(
    'Syntax Meridian'
  )
})

