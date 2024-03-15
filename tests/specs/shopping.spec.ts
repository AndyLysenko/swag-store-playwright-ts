import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { ProductInventoryComponent } from '../pages/components/product-inv-comp';
import { CartPage } from '../pages/cart-page';
import { ProductCartComponent } from '../pages/components/product-cart-comp';
import { Product, areProductsEqual } from '../model/product';
import { getProductByAlias } from '../helpers/test-data-helper';
import exp from 'constants';

// buy one product - checkout
// buy three products - checkout
// buy three products - one remove

test('shopping - one product - checkout', async ({ page }) => {
  const product = getProductByAlias('onesie');

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigate();

  // verify that product is in the inventory with correct details
  const productInv = new ProductInventoryComponent(page, product.name);
  expect(areProductsEqual(product, await productInv.getProductDetails())).toBe(true);

  await productInv.addProductToCart();

  // check that the product is in the cart
  expect(await inventoryPage.header.goodsInShoppingCard()).toBe(1);

  await inventoryPage.header.openShoppingCard();

  const productCart = new ProductCartComponent(page, product.name);
  const productFromCartUi = await productCart.getProductDetails();
  const quantity = await productCart.getQuantity();

  // verify that product is in the cart with correct details
  expect(product.id).toBe(productFromCartUi.id);
  expect(product.name).toBe(productFromCartUi.name);
  expect(product.description).toBe(productFromCartUi.description);
  expect(product.price).toBe(productFromCartUi.price);
  expect(quantity).toBe(1);

  const cartPage = new CartPage(page);
  await cartPage.checkout();
});

test('shopping - two products - checkout', async ({ page }) => {
  const productOnesie = getProductByAlias('onesie');
  const productBackpack = getProductByAlias('backpack');

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigate();

  // verify that product onesie is in the inventory with correct details
  const onesieInventory = new ProductInventoryComponent(page, productOnesie.name);
  expect(areProductsEqual(productOnesie, await onesieInventory.getProductDetails())).toBe(true);

  // verify that product backpack is in the inventory with correct details
  const backpackInventory = new ProductInventoryComponent(page, productBackpack.name);
  expect(areProductsEqual(productBackpack, await backpackInventory.getProductDetails())).toBe(true);

  await onesieInventory.addProductToCart();
  await backpackInventory.addProductToCart();

  // check that the products are in the cart
  expect(await inventoryPage.header.goodsInShoppingCard()).toBe(2);

  await inventoryPage.header.openShoppingCard();

  //onesie from UI
  const onesieCart = new ProductCartComponent(page, productOnesie.name);
  const onesieFromCartUi = await onesieCart.getProductDetails();

  //backpack from UI
  const backpackCart = new ProductCartComponent(page, productBackpack.name);
  const backpackFromCartUi = await backpackCart.getProductDetails();

  // verify that product onesie is in the cart with correct details
  expect(productOnesie.id).toBe(onesieFromCartUi.id);
  expect(productOnesie.name).toBe(onesieFromCartUi.name);
  expect(productOnesie.description).toBe(onesieFromCartUi.description);
  expect(productOnesie.price).toBe(onesieFromCartUi.price);
  expect(await onesieCart.getQuantity()).toBe(1);

  // verify that product onesie is in the cart with correct details
  expect(productBackpack.id).toBe(backpackFromCartUi.id);
  expect(productBackpack.name).toBe(backpackFromCartUi.name);
  expect(productBackpack.description).toBe(backpackFromCartUi.description);
  expect(productBackpack.price).toBe(backpackFromCartUi.price);
  expect(await backpackCart.getQuantity()).toBe(1);
  
  const cartPage = new CartPage(page);
  await cartPage.checkout();
});

test('shopping - add three remove one - continue shopping', async ({ page }) => {
  const productOnesie = getProductByAlias('onesie');
  const productBackpack = getProductByAlias('backpack');
  const productbikelight = getProductByAlias('bike-light');

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigate();

  // verify that product onesie is in the inventory with correct details
  const onesieInventory = new ProductInventoryComponent(page, productOnesie.name);
  expect(areProductsEqual(productOnesie, await onesieInventory.getProductDetails())).toBe(true);

  // verify that product backpack is in the inventory with correct details
  const backpackInventory = new ProductInventoryComponent(page, productBackpack.name);
  expect(areProductsEqual(productBackpack, await backpackInventory.getProductDetails())).toBe(true);

    // verify that product bikelight is in the inventory with correct details
    const bikelightInventory = new ProductInventoryComponent(page, productbikelight.name);
    expect(areProductsEqual(productbikelight, await bikelightInventory.getProductDetails())).toBe(true);

  await onesieInventory.addProductToCart();
  await backpackInventory.addProductToCart();
  await bikelightInventory.addProductToCart();

  // check that the products are in the cart
  expect(await inventoryPage.header.goodsInShoppingCard()).toBe(3);

  await inventoryPage.header.openShoppingCard();

  //onesie from UI
  const onesieCart = new ProductCartComponent(page, productOnesie.name);
  const onesieFromCartUi = await onesieCart.getProductDetails();

  //backpack from UI
  const backpackCart = new ProductCartComponent(page, productBackpack.name);
  const backpackFromCartUi = await backpackCart.getProductDetails();

  //bikelight from UI
  const bikelightCart = new ProductCartComponent(page, productbikelight.name);
  const bikelightFromCartUi = await bikelightCart.getProductDetails();

  // verify that product onesie is in the cart with correct details
  expect(productOnesie.id).toBe(onesieFromCartUi.id);
  expect(productOnesie.name).toBe(onesieFromCartUi.name);
  expect(productOnesie.description).toBe(onesieFromCartUi.description);
  expect(productOnesie.price).toBe(onesieFromCartUi.price);
  expect(await onesieCart.getQuantity()).toBe(1);

  // verify that product backpack is in the cart with correct details
  expect(productBackpack.id).toBe(backpackFromCartUi.id);
  expect(productBackpack.name).toBe(backpackFromCartUi.name);
  expect(productBackpack.description).toBe(backpackFromCartUi.description);
  expect(productBackpack.price).toBe(backpackFromCartUi.price);
  expect(await backpackCart.getQuantity()).toBe(1);

  // verify that product bikelight is in the cart with correct details
  expect(productbikelight.id).toBe(bikelightFromCartUi.id);
  expect(productbikelight.name).toBe(bikelightFromCartUi.name);
  expect(productbikelight.description).toBe(bikelightFromCartUi.description);
  expect(productbikelight.price).toBe(bikelightFromCartUi.price);
  expect(await bikelightCart.getQuantity()).toBe(1);

  // remove backpack from cart
  await backpackCart.removeProductFromCart();

  // check that the product is not in the cars
  expect(await backpackCart.isPresent()).toBe(false);

  // check correct products are in the cart
  expect(await inventoryPage.header.goodsInShoppingCard()).toBe(2);
    
  const cartPage = new CartPage(page);
  await cartPage.checkout();
});