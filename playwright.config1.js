// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,

  expect: { timeout: 10 * 1000 },

  reporter: 'html',
  retries:1,

  projects: [

    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: true,
        screenshot: 'on',
        trace: 'on'
      }
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        permissions:['geolocation'],
        //video:'retain-on-failure'
        // viewport: { width: 720, height: 720 }
        //...devices['iPhone 11']
      }
    }

  ]


});



