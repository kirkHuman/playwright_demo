import { Page, Locator, expect, selectors } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
//import { users_logins } from '../../data/users_logins';

export class HomePage extends PlaywrightDevPage {
  readonly signInLink: Locator;
  readonly acceptCookies: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.locator('[data-qa-automation="homePageSigninLink"]');
    this.acceptCookies = page.locator('xmlns');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.locator('[data-autotag="loginmodal-btn"]');
  }

  async openBurgerMenu() {
    await this.navBurgerMenu.click();
    await expect(this.signInLink).toBeVisible();
  }

  async pageObjectModel() {
    await this.goto();
    await this.openBurgerMenu();
  }

  async loginToApplication(email: string, password: string) {
    await this.emailInput.focus();
    await this.emailInput.fill(email, { timeout: 5000 });
    await this.passwordInput.focus();
    await this.passwordInput.fill(password, { timeout: 5000 });
    expect(async () => {
      await this.signInButton.click();
    }).toPass();
  }
}
