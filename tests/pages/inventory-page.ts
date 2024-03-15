import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { HeaderComponent } from "./components/header-comp";
import { MenuComponent } from "./components/menu-comp";

export class InventoryPage extends BasePage {
  private inventoryTitle: Locator;
  private sortDropdown: Locator;
  public header: HeaderComponent;
  public menu: MenuComponent;

  constructor(page: Page) {
    super(page, '/inventory.html', 'text=Products');
    this.header = new HeaderComponent(page);
    this.menu = new MenuComponent(page);

    this.inventoryTitle = this.page.getByText('Products');
    this.sortDropdown = this.page.getByTestId('product_sort_container');
  }

  async sortProductsByPriceLowToHigh() {
    await this.sortDropdown.selectOption({ label: 'Price (low to high)' });
  }

  async sortProductsByPriceHighToLow() {
    await this.sortDropdown.selectOption({ label: 'Price (high to low)' });
  }

  async sortProductsByNameAtoZ() {
    await this.sortDropdown.selectOption({ label: 'Name (A to Z)' });
  }

  async sortProductsByNameZtoA() {
    await this.sortDropdown.selectOption({ label: 'Name (Z to A)' });
  }

  async resetSortToDefault() {
    await this.sortProductsByNameAtoZ();
  }

}
