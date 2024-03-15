import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage 
{
  private usernameLocator: Locator;
  private passwordLocator: Locator;
  private loginButtonLocator: Locator;
  

  constructor(page: Page) {
    super(page, '/', '[data-test="username"]');

    this.usernameLocator = this.page.getByTestId('username');
    this.passwordLocator = this.page.getByTestId('password');
    this.loginButtonLocator = this.page.getByTestId('login-button');
  }

  async fillUsername(username: string) {
    await this.usernameLocator.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordLocator.fill(password);
  }

  async submit() {
    await this.loginButtonLocator.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}
