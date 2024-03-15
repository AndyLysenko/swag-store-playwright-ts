import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { ProductInventoryComponent } from '../pages/components/product-inv-comp';
import { CartPage } from '../pages/cart-page';
import { getProductByAlias } from '../helpers/test-data-helper';

test('navigation - logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.navigate();
  await inventoryPage.header.openMenu();
  await inventoryPage.menu.logout();

  await loginPage.verifyPageDisplayed();
});

test('navigation - about', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.navigate();
  await inventoryPage.header.openMenu();
  await inventoryPage.menu.openAbout();

  expect(page.url()).toBe('https://saucelabs.com/');
});

test('navigation - all items', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const shoppingCardPage = new CartPage(page);

  await inventoryPage.navigate();
  await inventoryPage.header.openShoppingCard();
  await shoppingCardPage.verifyPageDisplayed();

  await shoppingCardPage.header.openMenu();
  await shoppingCardPage.menu.openAllItems();

  await inventoryPage.verifyPageDisplayed();
});


test('navigation - reset app state', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const product = getProductByAlias('onesie');

  await inventoryPage.navigate();

  const productInv = new ProductInventoryComponent(page, product.name);
  await productInv.addProductToCart();

  expect(await inventoryPage.header.goodsInShoppingCard()).toBe(1);

  await inventoryPage.header.openMenu();
  await inventoryPage.menu.resetAppState();

  expect(await inventoryPage.header.goodsInShoppingCard()).toBe(0);
});

test('navigation - shoping card', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.navigate();
  await inventoryPage.header.openShoppingCard();

  await cartPage.verifyPageDisplayed();

  await cartPage.continueShopping();

  await inventoryPage.verifyPageDisplayed();
});