import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
import { HomePage } from '../home/home.page';
import { RegistrationPage } from '../registration/registration.page';
import { users_logins } from '../../data/users_logins';
import { MyAccountPage } from '../my_account/my_account.page';

const country = process.env.COUNTRY?.toLocaleLowerCase() || 'us';
const userCredentials = users_logins[country]?.non_vip;

test.beforeEach(async ({ page }) => {
  const playWrightDevPage = new PlaywrightDevPage(page);
  await playWrightDevPage.openApplication();
});

test('sould register a new user', async ({ page }) => {
  const homePage = new HomePage(page);
  const registrationPage = new RegistrationPage(page);
  const myAccountPage = new MyAccountPage(page);
  await registrationPage.openSignUpFormFromHomePage();
  await registrationPage.createAccount(
    userCredentials.email,
    userCredentials.password
  );
  await homePage.navBurgerMenu.waitFor();
  await homePage.navBurgerMenu.click();
  await page.waitForTimeout(10000);
  await myAccountPage.goto();
});
