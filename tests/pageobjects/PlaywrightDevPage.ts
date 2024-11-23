import { expect, type Locator, type Page } from '@playwright/test';
import { signIn_textes } from '../expected_results/sign_in';
import { setBrandDetails } from '../../utils/brand';

const country = process.env.COUNTRY?.toLocaleLowerCase() || 'none';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly navBurgerMenu: Locator;
  readonly gettingStartedHeader: Locator;
  readonly signInLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBurgerMenu = page.getByRole('button', { name: 'Navigation' });
    this.signInLink = page.locator(
      '[data-qa-automation="homePageSigninLink"]',
      {
        hasText: signIn_textes[country],
      }
    );
  }

  async goto() {
    await this.page.goto('/');
  }

  async openBurgerMenu() {
    await this.navBurgerMenu.click();
    await expect(this.signInLink).toBeVisible();
  }

  async pageObjectModel() {
    await this.goto();
    await this.openBurgerMenu();
  }

  async openApplication() {
    try {
      await this.page.goto('/');
      await setBrandDetails(this.page.url());
    } catch (error) {
      console.log('Error from openApplication: ' + error);
    }
  }
}
