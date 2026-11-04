const { test, expect } = require('@playwright/test');

test('Security Validation', async ({ page }) => {
    //const page = await browser.newContext().newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    //login
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("[type=submit]");
    const email = "uvaishsmartskills@gmail.com";
    await username.fill(email);
    await password.fill("practice");
    await loginBtn.click();

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aad41d22be7a4bc2b786b98" })
    )

    await page.locator("button:has-text('View')").first().click();

    const message = await page.locator("p.blink_me").textContent();
    console.log(message);

    await expect(page.locator("p.blink_me")).toHaveText("You are not authorize to view this order");

    await page.pause();

})

test('Abort call', async ({ page }) => {

    //await page.route('**/*.css', route => route.abort());
    await page.route("**/*.{jpg,png,jpeg}",route=>route.abort());

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();

    await page.pause();


})