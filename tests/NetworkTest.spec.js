const { test, expect, request } = require('@playwright/test')
const { BaseAPIUtils } = require('./Utils/BaseAPIUtils')

//body
const loginPayload = { "userEmail": "uvaishsmartskills@gmail.com", "userPassword": "practice" };
const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakeOrderPayload = { "data": [], "message": "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new BaseAPIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);

})


test('@API Ecommerce Validation', async ({ page }) => {


    await page.addInitScript(value => { window.localStorage.setItem('token', value) }, response.token);

    //const page = await browser.newContext().newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",


        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeOrderPayload);
            route.fulfill({
                response,
                body
            })

        })

        await page.locator("button[routerlink*=myorders]").click();

        //to wait for the specific response
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

        const message = await page.locator("div.mt-4").textContent();
        console.log(message);












})