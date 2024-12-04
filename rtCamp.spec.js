const { test, expect, chromium } = require('@playwright/test');

// Constants for Selectors
const URL = 'https://www.saucedemo.com/';
const USERNAME_INPUT = 'input[placeholder="Username"]';
const PASSWORD_INPUT = 'input[placeholder="Password"]';
const LOGIN_BUTTON = 'xpath=//input[@id="login-button"]';
const INVENTORY_ITEMS = 'div.inventory_item';
const SORT_DROPDOWN = 'select.product_sort_container';
const ADD_TO_CART_PREFIX = '#add-to-cart-';

test('RtCamp Assignment with SlowMo', async () => {
  const browser = await chromium.launch({
    headless: false, // Make the browser visible
    slowMo: 500, // Add a 500ms delay between actions
  });
  const page = await browser.newPage();

  // Enable logging for console messages
  page.on('console', (msg) => console.log('Console message:', msg.text()));

  // Enable logging for network requests
  page.on('request', (request) =>
    console.log('Network Request:', request.method(), request.url())
  );

  // Enable logging for network responses
  page.on('response', (response) =>
    console.log('Network Response:', response.status(), response.url())
  );

  // Navigate to the webpage
  await page.goto(URL);
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Swag Labs');
  console.log('Page title:', pageTitle);

  // Perform login
  await login(page);

  // Verify inventory items before sorting
  const itemsBeforeSort = await getItems(page, 'before sorting');

  // Sort items Z-A and verify
  await sortItemsAndVerify(page, 'za', 'Z-A');

  // Sort items by Price: High to Low and verify
  await sortItemsAndVerify(page, 'hilo', 'Price High to Low');

  // Add multiple items to cart
  await addItemsToCart(page);

  // Navigate to shopping cart and proceed to checkout
  await checkout(page);

  // Assert all items are displayed and the total price
  await verifyCheckoutItems(page);

  // Finish the purchase process
  await finishPurchase(page);

  // Logout and verify navigation to login page
  await logout(page);

  // Close the browser
  await browser.close();
});

// Utility function to perform login
async function login(page) {
  await page.fill(USERNAME_INPUT, 'standard_user');
  await page.fill(PASSWORD_INPUT, 'secret_sauce');
  await page.click(LOGIN_BUTTON);
  await page.waitForLoadState('networkidle');
}

// Utility function to get items list
async function getItems(page, action) {
  console.log(`Items displayed ${action}:`);
  const items = await page.locator(INVENTORY_ITEMS).allTextContents();
  printItems(items);
  return items;
}

// Utility function to sort items and verify
async function sortItemsAndVerify(page, optionValue, sortType) {
  await page.selectOption(SORT_DROPDOWN, optionValue);
  await page.waitForLoadState('networkidle');
  console.log(`Items displayed after ${sortType} sorting:`);
  const sortedItems = await page.locator(INVENTORY_ITEMS).allTextContents();
  printItems(sortedItems);
}

// Utility function to add items to the cart
async function addItemsToCart(page) {
  const itemIds = [
    'sauce-labs-fleece-jacket',
    'sauce-labs-backpack',
    'sauce-labs-bolt-t-shirt',
    'test\\.allthethings\\(\\)-t-shirt\\-\\(red\\)',
    'sauce-labs-bike-light',
    'sauce-labs-onesie',
  ];

  for (const itemId of itemIds) {
    await page.locator(`${ADD_TO_CART_PREFIX}${itemId}`).click();
  }
}

// Utility function to proceed to checkout
async function checkout(page) {
  await page.locator('#shopping_cart_container').click();
  await page.locator('#checkout').click();
  await page.fill('#first-name', 'Parag');
  await page.fill('#last-name', 'Trivedi');
  await page.fill('#postal-code', '411028');
  await page.locator('#continue').click();
}

// Utility function to verify checkout items
async function verifyCheckoutItems(page) {
  const checkoutItems = await page.locator(INVENTORY_ITEMS).allTextContents();
  printItems(checkoutItems);
}

// Utility function to finish the purchase
async function finishPurchase(page) {
  await page.locator('#finish').click();
}

// Utility function to perform logout and verify login page
async function logout(page) {
  await page.locator('#back-to-products').click();
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Swag Labs');
  console.log('Page title:', pageTitle);
}

// Utility function to print items
function printItems(items) {
  console.log('Total items:', items.length);
  for (const item of items) {
    console.log(item);
  }
}
