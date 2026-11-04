const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../tests/page-objects/POManager');
const { test, expect, chromium } = require('@playwright/test')

Given('Login to Ecommerce application with {string} and {string}', {timeout:10*1000},async function (username, password) {

  //login

  const loginPage = this.pomManager.getLoginPage()
  await loginPage.goTo();
  await loginPage.validLogin(username, password);


});

When('Add {string} to cart', async function (productName) {
  this.dashboardPage = this.pomManager.getDashboardPage();
  await this.dashboardPage.searchProduct(productName);
  await this.dashboardPage.navigateToCart();

});

Then('Verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.pomManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When('Enter valid details and Place the order', async function () {
  const ordersReviewPage = this.pomManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then('Verify order is present in the OrderHistory', async function () {
  await this.dashboardPage.navigateToOrders();

  //OrderHistoryPage
  const ordersHistoryPage = this.pomManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


Given('Login to Ecommerce rahul application with {string} and {string}', async function (username, password) {
await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await this.page.locator("#username").fill(username);
await this.page.locator("[type='password']").fill(password);
await this.page.locator("#signInBtn").click();
});

When('Verify the error message', async function () {
  
const errorMessage = await this.page.locator("[style*='block']").textContent();
console.log(errorMessage);
});


