import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
import { HomePage } from '../home/home.page';
import { users_logins } from '../../data/users_logins';

// Define country-specific user credentials
const country = process.env.COUNTRY?.toLocaleLowerCase() || 'us';
const userCredentials = users_logins[country]?.non_vip;

// Shared variables for page objects
let playWrightDevPage: PlaywrightDevPage;
let homePage: HomePage;

// Test setup for application initialization
test.beforeEach(async ({ page }) => {
  playWrightDevPage = new PlaywrightDevPage(page);
  homePage = new HomePage(page);

  // Open the application
  await playWrightDevPage.openApplication();
});

test('should open the burger menu', async ({ page }) => {
  // Open burger menu and assert visibility of Sign In link
  await playWrightDevPage.openBurgerMenu();
  await expect(playWrightDevPage.signInLink).toBeVisible();

  // Perform Sign In
  await playWrightDevPage.signInLink.click();
  await homePage.loginToApplication(
    userCredentials.email,
    userCredentials.password
  );

  // Reopen burger menu and validate it works
  await playWrightDevPage.navBurgerMenu.waitFor();
  await expect(playWrightDevPage.navBurgerMenu).toBeVisible();
  await playWrightDevPage.navBurgerMenu.click();
});
