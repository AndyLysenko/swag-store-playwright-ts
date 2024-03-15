import { Locator, Page } from "@playwright/test";
import { Product } from "../../model/product";

export class ProductInventoryComponent {
  private page: Page;
  private placeholder: Locator;

  private addRemoveButton: Locator;
  private nameLabel: Locator;
  private descriptionLabel: Locator;
  private image: Locator;
  private priceLabel: Locator;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.nameLabel = page.locator(`.inventory_item_name:text("${productName}")`);
    this.placeholder = this.nameLabel.locator('xpath=../../../..');
    this.descriptionLabel = this.placeholder.locator('.inventory_item_desc');
    this.image = this.placeholder.getByRole('img');
    this.priceLabel = this.placeholder.locator('.inventory_item_price');
    this.addRemoveButton = this.placeholder.getByRole('button');
  }

  async addProductToCart() {
    await this.addRemoveButton.click();
  }

  async removeProductFromCart() {
    await this.addRemoveButton.click();
  }

  async getProductTitle() {
    return await this.nameLabel.textContent();
  }

  async getProductDescription() {
    return await this.descriptionLabel.textContent() || '';
  }

  async getProductImageSrc() {
    return await this.image.getAttribute('src') || '';
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

    const regex = /item_(\d+)_img_link/;

    // Use match() method with the regex to extract the number
    const match = text.match(regex);

    // match[1] will contain the captured group if a match is found
    const number = match ? match[1] : null;
    return number;
  }

  async isAddedToCard(): Promise<boolean> {
    const buttonText = await this.addRemoveButton.textContent();
    return buttonText === 'Remove';
  }

  async getProductDetails(): Promise<Product> {
    return {
      id: await this.getProductId(),
      name: await this.getProductTitle() || '',
      description: await this.getProductDescription(),
      price: await this.getProductPrice() || 0,
      imageSrc: await this.getProductImageSrc(),
      alias: null,
    };
  }
}
