import { Locator, Page } from "@playwright/test";

export class MenuComponent{
    private page: Page;
    private resetAppStateButton: Locator;
    private logoutButton: Locator;
    private allItemsButton: Locator;
    private closeMenuButton: Locator;
    private aboutMenuButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.resetAppStateButton = this.page.locator('#reset_sidebar_link');
        this.logoutButton = this.page.locator('#logout_sidebar_link');
        this.allItemsButton = this.page.locator('#inventory_sidebar_link');
        this.closeMenuButton = this.page.locator('#react-burger-cross-btn');
        this.aboutMenuButton = this.page.locator('#about_sidebar_link');
    }
    
    async close() {
        await this.closeMenuButton.click();
    }
    
    async resetAppState() {
        await this.resetAppStateButton.click();
    }
    
    async logout() {
        await this.logoutButton.click();
    }

    async openAllItems() {
        await this.allItemsButton.click();
    }

    async openAbout() {
        await this.aboutMenuButton.click();
    }    
}