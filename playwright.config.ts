import { defineConfig, devices } from '@playwright/test';
import environments_file from './environments/environments';

const environment = process.env.ENVIRONMENT || 'production';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'https://www.google.com',
    trace: 'on-first-retry',
    video: {
      mode: 'on',
      size: { width: 640, height: 480 },
    },
  },

  projects: [
    {
      name: 'US Safari',
      use: {
        ...devices['iPhone 15'],
        locale: 'en-US',
        timezoneId: 'America/New_York',
        baseURL: environments_file[environment]['us'],
      },
    },
    {
      name: 'EU Safari',
      use: {
        ...devices['iPhone 15'],
        locale: 'en-GB',
        timezoneId: 'Europe/London',
        baseURL: environments_file[environment]['eu'],
      },
    },
    {
      name: 'FR Safari',
      use: {
        ...devices['iPhone 15'],
        locale: 'fr-FR',
        timezoneId: 'Europe/Paris',
        baseURL: environments_file[environment]['fr'],
      },
    },
    {
      name: 'ES Safari',
      use: {
        ...devices['iPhone 15'],
        locale: 'es-ES',
        timezoneId: 'Europe/Madrid',
        baseURL: environments_file[environment]['es'],
      },
    },
    {
      name: 'DE Safari',
      use: {
        ...devices['iPhone 15'],
        locale: 'de-DE',
        timezoneId: 'Europe/Berlin',
        baseURL: environments_file[environment]['de'],
      },
    },
    {
      name: 'UK Safari',
      use: {
        ...devices['iPhone 15'],
        locale: 'en-GB',
        timezoneId: 'Europe/London',
        baseURL: environments_file[environment]['uk'],
      },
    },
  ],
});
