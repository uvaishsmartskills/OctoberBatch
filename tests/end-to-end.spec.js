const {test,expect}=require('@playwright/test');

test('Ecommerce Validation',async({page})=>{

    //const page = await browser.newContext().newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    //login
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("[type=submit]");
    const email="uvaishsmartskills@gmail.com";
    await username.fill(email);
    await password.fill("practice");
    await loginBtn.click();

   //wait
   await page.locator("div.card-body").first().waitFor();

   //common locator for entire product details
    const products = page.locator("div.card-body");
    //count
    const count = await products.count();
    //which product you want to select
    const productName ="ZARA COAT 3";

    //iteration(click the add to for the target product name)
    for(let i=0;i<count;++i){
       //fetching product name from UI
       const name= await  products.nth(i).locator("b").textContent();
       if(name === productName){
            //add to cart
           await products.nth(i).locator("text= Add To Cart").click();
           break;
       }

    }
  
    //to click the cart icon
    await page.locator("[routerlink*=cart]").click();

    //wait for loading the cart page
    await page.locator("div li").first().waitFor();

    //check the product is visible in the cart
    const visiblity= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();//(true or false)

   //assert the visibililty
   expect(visiblity).toBeTruthy();

   //click on checkout button
   await page.locator("text=Checkout").click();

   //to press the key one by one ---pressSequentially
   await page.locator("[placeholder*=Country]").pressSequentially("ind");

   //to locate all the options in dropdown
   const dropdown = page.locator("section.ta-results");

   //waitFor
   await dropdown.waitFor();

   //to count the individual option
   const countOfOptions = await dropdown.locator("button").count();

   //selecting the country
   for(let i=0;i<countOfOptions;++i){
    const country = await dropdown.locator("button").nth(i).textContent();
    if(country===" India"){
        await dropdown.locator("button").nth(i).click();
        break;
    }

   }

   //asserting the email
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

   //click the place order
   await page.locator(".action__submit").click();

   //asserting the thank you message
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   //retriving the order Id
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   //click on orders
   await page.locator("button[routerlink*=myorders]").click();

   //wait for the table body to load
   await page.locator("tbody").waitFor();

   //locating all the rows
   const rows = page.locator("tbody tr");

   //await rows.nth(0).locator("th").waitFor();
   
   //to view the order what we have placed 
   for(let i=0;i<await rows.count();++i){
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)){
               await rows.nth(i).locator("button").first().click();
                break;
            }

   }

   //to verify the orderid in summary page
   const orderDetails = await page.locator("div.col-text").textContent();
   expect(orderId.includes(orderDetails)).toBeTruthy();

    await page.pause();

})