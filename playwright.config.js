// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  //workers:6,
  expect: { timeout: 10 * 1000 },

  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'off',
    trace: 'off',
    
   // viewport: { width: 720, height: 720 }
   //...devices['iPhone 11']
  }

});



