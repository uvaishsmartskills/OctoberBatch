const { test, expect } = require("@playwright/test")


//test.describe.configure({mode:"serial"});
test('More Validation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("#username").fill("rahulshettyacademy");

    //screenshot for particular element or locator
    await page.locator("#username").screenshot({path:"username.png"});

    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    
    //screenshot for entire page
    await page.screenshot({path:"login.png"});

})

// test('Visual Testing',async({page})=>{

// await page.goto("https://www.facebook.com/");
// expect(await page.screenshot()).toMatchSnapshot('Landing.png');

// })




test.skip('Login Test',async({page})=>{

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator("#username").fill("rahulshettyacademy");
await page.locator("[type='password']").fill("Learning@830$3mK2");
await page.locator("#signInBtn").click();

//index start with zero ---nth(index)
const secondProduct = await page.locator(".card-body a").nth(1).textContent();
await console.log(secondProduct);

//first()
const firstProduct = await page.locator(".card-body a").first().textContent();
await console.log(firstProduct);

//last()
const lastProduct = await page.locator(".card-body a").last().textContent();
await console.log(lastProduct);

//fetch all the product----allTextContents
const allProducts = await page.locator(".card-body a").allTextContents();
await console.log(allProducts);

//await page.pause();


})



test('Playwright First Test', async ({browser})=>{
   //new context
   const context = await browser.newContext();
   //new page
   const page = await context.newPage();
   //launch the url
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   console.log(await page.title());
  
})
