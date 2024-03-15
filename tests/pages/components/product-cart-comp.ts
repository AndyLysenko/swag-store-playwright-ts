import { Locator, Page } from "@playwright/test";

export class ProductCartComponent {
  private page: Page;
  private placeholder: Locator;

  private removeButton: Locator;
  private nameLabel: Locator;
  private descriptionLabel: Locator;
  private priceLabel: Locator;
  private quantityLabel: Locator;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.nameLabel = page.locator(`.inventory_item_name:text("${productName}")`);
    this.placeholder = this.nameLabel.locator('xpath=../../..');
    this.descriptionLabel = this.placeholder.locator('.inventory_item_desc');
    this.priceLabel = this.placeholder.locator('.inventory_item_price');
    this.quantityLabel = this.placeholder.locator('.cart_quantity');
    this.removeButton = this.placeholder.getByRole('button');
  }

  async removeProductFromCart() {
    await this.removeButton.click();
  }

  async getProductTitle() {
    return await this.nameLabel.textContent();
  }

  async getProductDescription() {
    return await this.descriptionLabel.textContent();
  }

  async getProductPrice() {
    const priceText = await this.priceLabel.textContent();
    if (priceText) {
      return parseFloat(priceText.substring(1));
    }
    return null;
  }

  async getProductId() {
    const text = await this.placeholder.innerHTML();

    const regex = /item_(\d+)_title_link/;

    // Use match() method with the regex to extract the number
    const match = text.match(regex);

    // match[1] will contain the captured group if a match is found
    const number = match ? match[1] : null;
    return number;
  }

  async isPresent(): Promise<boolean> {
    return await this.nameLabel.count() > 0;
  }

  async getQuantity() {
    return parseInt(await this.quantityLabel.textContent() || '0');
  }

  async getProductDetails() {
    return {
      id: await this.getProductId(),
      name: await this.getProductTitle() || '',
      description: await this.getProductDescription(),
      price: await this.getProductPrice() || 0,
      quantity: await this.getQuantity(),
      alias: null,
    };
  }
}    