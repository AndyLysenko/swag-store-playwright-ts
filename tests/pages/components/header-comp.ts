import { Locator, Page } from "@playwright/test";

export class HeaderComponent{
    private page: Page;
    private menuButton: Locator;
    private shoppingCardButton: Locator;
    private appLogo: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.menuButton = this.page.locator('#react-burger-menu-btn');
        this.shoppingCardButton = this.page.locator('#shopping_cart_container a');
        this.appLogo = this.page.getByText('Swag Labs');
    }
    
    async goodsInShoppingCard(): Promise<number> {
        return parseInt(await this.shoppingCardButton.textContent() || '0');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async openShoppingCard() {
        await this.shoppingCardButton.click();
    }
}