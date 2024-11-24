import { expect, Locator, Page } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
import { HomePage } from '../home/home.page';

export class RegistrationPage extends PlaywrightDevPage {
  readonly acceptCookies: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly createAccountButton: Locator;
  readonly howDidYouHearAboutUs: Locator;
  readonly subscribeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.acceptCookies = page.locator('xmlns');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signUpButton = page.locator('[data-autotag="reg-continue-btn"]');
    this.createAccountButton = page.locator(
      '[data-autotag="create-account-button"]'
    );
    this.howDidYouHearAboutUs = page.locator(
      '[data-qa-automation="howDidUHearAboutUsDD"] label'
    );
    this.subscribeCheckbox = page.locator('span [name="subscribeToEmails"]');
  }

  async pageObjectModel() {
    await this.goto();
  }

  async openSignUpFormFromHomePage() {
    const playWrightDevPage = new PlaywrightDevPage(this.page);
    await playWrightDevPage.openBurgerMenu();
    await this.signInLink.click();
    await expect(this.emailInput).toBeVisible();
    await this.createAccountButton.click();
    await expect(this.emailInput).toBeVisible();
  }

  async createAccount(email: string, password: string) {
    expect(this.emailInput).toBeVisible();
    await this.emailInput.focus();
    await this.emailInput.fill(email, { timeout: 5000 });
    await this.passwordInput.focus();
    await this.passwordInput.fill(password, { timeout: 5000 });
    await this.howDidYouHearAboutUs.selectOption({
      index: 2,
    });
    //try {
    //expect.soft(this.subscribeCheckbox).toBeVisible();
    //await this.subscribeCheckbox.click();
    //   console.log('Checkbox checked');
    //  } catch (error) {}
    // expect(async () => {
    await this.signUpButton.click();
    //}).toPass();
  }
}
