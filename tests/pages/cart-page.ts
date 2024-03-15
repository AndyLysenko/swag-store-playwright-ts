import { Page, Locator} from "@playwright/test";
import { BasePage } from "./base-page";
import { HeaderComponent } from "./components/header-comp";
import { MenuComponent } from "./components/menu-comp";

export class CartPage extends BasePage {
  private continueShoppingButton: Locator;
  private checkoutButton: Locator;
  private cardTitle: Locator;
  public header: HeaderComponent;
  public menu: MenuComponent;
  

  constructor(page: Page) {
    super(page, '/cart.html', 'text=Your Cart');
    
    this.header = new HeaderComponent(page);
    this.menu = new MenuComponent(page);

    this.cardTitle = this.page.getByText('Your Cart');
    this.checkoutButton = this.page.getByTestId('checkout');
    this.continueShoppingButton = this.page.getByTestId('continue-shopping');

  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
