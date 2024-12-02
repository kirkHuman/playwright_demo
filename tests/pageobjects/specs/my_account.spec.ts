import { test, expect } from '@playwright/test';
import { MyAccountPage } from '../my_account/my_account.page';
import { HomePage } from '../home/home.page';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
import { users_logins } from '../../data/users_logins';

const country = process.env.COUNTRY?.toLocaleLowerCase() || 'us';
const userCredentials = users_logins[country]?.non_vip;

test('SUIT my Account Page', async ({ page }) => {
  let myAccountPage: MyAccountPage;
  let homePage: HomePage;
  let playWrightDevPage: PlaywrightDevPage;
  playWrightDevPage = new PlaywrightDevPage(page);
  myAccountPage = new MyAccountPage(page);
  homePage = new HomePage(page);
  await playWrightDevPage.openApplication();
  await homePage.openBurgerMenu();
  await homePage.signInLink.click();
  await homePage.loginToApplication(
    userCredentials.email,
    userCredentials.password
  );
  await homePage.goto_MyProfile();
  //await myAccountPage.goto();
  //expect(async () => {
  await expect(myAccountPage.firstNameField).toBeVisible();
  await expect(myAccountPage.lastNameField).toBeVisible();
  //}).toPass();
  await expect(myAccountPage.firstNameField).toBeVisible();
  await expect(myAccountPage.lastNameField).toBeVisible();
  await myAccountPage.updateProfile();
  await myAccountPage.save();
});
