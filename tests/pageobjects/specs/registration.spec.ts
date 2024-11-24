import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
import { HomePage } from '../home/home.page';
import { RegistrationPage } from '../registration/registration.page';

test.beforeEach(async ({ page }) => {
  const playWrightDevPage = new PlaywrightDevPage(page);
  await playWrightDevPage.openApplication();
});

test('sould register a new user', async ({ page }) => {
  const homePage = new HomePage(page);
  const registrationPage = new RegistrationPage(page);
  await registrationPage.openSignUpFormFromHomePage();
  await registrationPage.createAccount('v.automation@test.com', 'password');
  //   expect(async () => {
  await homePage.navBurgerMenu.waitFor();
  //   }).toPass();
  expect(homePage.navBurgerMenu).toBeVisible();
});
