import { Page, expect } from "@playwright/test";
import { BASE_URL } from "../constants";

export class BasePage {
  protected page: Page; 
  protected url: string | undefined;
  private pageValidateLocatorString: string | undefined;

  constructor(page: Page, url?: string, pageValidateLocator?: string) {
    this.page = page;
    this.pageValidateLocatorString = pageValidateLocator;

    if (url != null) {
      this.url = BASE_URL + url;
    }
  }

  async navigate() {
    if (this.url != null) {
      await this.page.goto(this.url);
    } else {
      throw new Error('Cant navigate to the page. No URL provided.');
    }
  }

  async verifyPageDisplayed() {
    if (this.url != null) {
      expect(this.page.url()).toBe(this.url);
    }

    if (this.pageValidateLocatorString != null) {
      await expect(this.page.locator(this.pageValidateLocatorString)).toBeVisible();
    }

    if (this.url == null && this.pageValidateLocatorString == null) {
      throw new Error('Cant verify the page is open. No URL or page validation locator provided');
    }
  }
  
}
