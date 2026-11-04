const { test, expect } = require('@playwright/test');
const { POManager } = require('./page-objects/POManager');
const { customtest } = require('./Utils/test-base');
//json-->String-->js Object
const dataSet = JSON.parse(JSON.stringify(require('./Utils/client-app-po-test-data.json')));

for (const data of dataSet) {
    test(`Ecommerce Validation ${data.productName}`, async ({ page }) => {

        //pom manager object
        const pomManager = new POManager(page);

        //login
        const loginPage = pomManager.getLoginPage()
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        //which product you want to select ////to click the cart icon
        const dashboardPage = pomManager.getDashboardPage();
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();

        //cartPage
        const cartPage = pomManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        //OrdersReviewPage
        const ordersReviewPage = pomManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();

        //OrderHistoryPage
        const ordersHistoryPage = pomManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    })
}

customtest('Ecommerce Validation', async ({ page, testDataForOrder }) => {

    //pom manager object
    const pomManager = new POManager(page);

    //login

    const loginPage = pomManager.getLoginPage()
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);


    //which product you want to select ////to click the cart icon
    const dashboardPage = pomManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();


    //cartPage
    const cartPage = pomManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    //OrdersReviewPage
    const ordersReviewPage = pomManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();

    //OrderHistoryPage
    const ordersHistoryPage = pomManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})
