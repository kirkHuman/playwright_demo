import { expect, Locator, Page } from '@playwright/test';
import { PlaywrightDevPage } from '../PlaywrightDevPage';
import { HomePage } from '../home/home.page';

export class MyAccountPage extends HomePage {
  readonly url: string = '/account/profile'; // URL for My Account page
  readonly myAccountForm: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly myAccountBirthMonth: Locator;
  readonly myAccountBirthDay: Locator;
  readonly myAccountBirthYear: Locator;
  readonly myAccountDropdown: Locator;
  readonly myAccountProfileMenu: Locator;
  readonly myAccountOrderHistoryMenu: Locator;
  readonly myAccountReviewMenu: Locator;
  readonly myAccountShippingInfoMenu: Locator;
  readonly myAccountPaymentInfoMenu: Locator;
  readonly myAccountEmailPrefMenu: Locator;
  readonly myAccountSaveButton: Locator;

  constructor(page: Page) {
    super(page); // Call the base class constructor
    this.myAccountForm = page.locator('[data-autotag="customer-id-number"]'); // Initialize the locator
    this.firstNameField = page.locator('[name="firstName"]');
    this.lastNameField = page.locator('[name="lastName"]');
    this.emailField = page.locator('[data-autotag="pii-profile-email"]');
    this.myAccountBirthMonth = page.locator('[name="birthMonth"]');
    this.myAccountBirthDay = page.locator('[name="birthDay"]');
    this.myAccountBirthYear = page.locator('[name="birthYear"]');
    this.myAccountDropdown = page.locator(
      'button [data-autotag="myacctMenuDropdown"] div'
    );
    this.myAccountProfileMenu = page.locator(
      '[data-autotag="myacctMenuProfile"]'
    );
    this.myAccountOrderHistoryMenu = page.locator(
      '[data-autotag="myacctMenuOrderHistory"]'
    );
    this.myAccountReviewMenu = page.locator(
      '[data-autotag="myacctMenuReview"]'
    );
    this.myAccountShippingInfoMenu = page.locator(
      '[data-autotag="myacctMenuShippingInfo"]'
    );
    this.myAccountPaymentInfoMenu = page.locator(
      '[data-autotag="myacctMenuPaymentInfo"]'
    );
    this.myAccountEmailPrefMenu = page.locator(
      '[data-autotag="myacctMenuEmailPref"]'
    );
    this.myAccountSaveButton = page.locator('[type="submit"][class^="Button"]');
  }

  async updateProfile(): Promise<void> {
    this.page.on('popup', async (popup) => {
      console.log(popup.title());
      await popup.close();
    });
    await this.firstNameField.fill('John');
    await this.lastNameField.fill('Doe');
    await this.emailField.fill('v.automation@test.com');
    await this.myAccountBirthMonth.fill('01');
    await this.myAccountBirthDay.fill('01');
    await this.myAccountBirthYear.fill('2000', { force: true });
    //await this.myAccountSaveButton.scrollIntoViewIfNeeded();
    await this.save();
  }

  async save(): Promise<void> {
    await this.myAccountSaveButton.click();
  }
}
