import { expect, Locator, Page } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';

export class MyAccountPage extends PlaywrightDevPage {
  readonly url: string = '/account/profile'; // URL for My Account page
  readonly myAccountForm: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;

  constructor(page: Page) {
    super(page); // Call the base class constructor
    this.myAccountForm = page.locator('[data-autotag="customer-id-number"]'); // Initialize the locator
    this.firstNameField = page.locator('[name="firstName"]');
    this.lastNameField = page.locator('[name="lastName"]');
  }

  // Navigate to the My Account page
  async goto(): Promise<void> {
    await this.page.goto(this.url); // Navigate to the URL
    await expect.soft(this.firstNameField).toBeVisible(); // Assert visibility of the First Name field
    await expect.soft(this.lastNameField).toBeVisible(); // Assert visibility of the Last Name field
  }
}
