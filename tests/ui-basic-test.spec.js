const{test,expect}= require('@playwright/test');

test('@web Playwright First Test', async ({browser})=>{
   //new context
   const context = await browser.newContext();
   //new page
   const page = await context.newPage();
   //launch the url
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   console.log(await page.title());
  
})

test('@web Playwright Second Test',async({page})=>{

   await page.goto("https://www.google.com/");
   console.log(await page.title());
 
   await expect(page).toHaveTitle("Google");



})


test('Login Test',{tag:["@smoke","@reg"]},async({page})=>{

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


test('Negative Login and assert',async({page})=>{

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator("#username").fill("rahulshettyacademy");
await page.locator("[type='password']").fill("abc");
await page.locator("#signInBtn").click();


const errorMessage = await page.locator("[style*='block']").textContent();
console.log(errorMessage);

await expect(page.locator("[style*='block']")).toContainText("uvaish");

})


