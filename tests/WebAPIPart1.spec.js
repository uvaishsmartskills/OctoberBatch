const {test,expect,request} = require('@playwright/test')
const {BaseAPIUtils}=require('./Utils/BaseAPIUtils')

//body
const loginPayload={"userEmail":"uvaishsmartskills@gmail.com","userPassword":"practice"};
const createOrderPayload={orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
let response;

test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new BaseAPIUtils(apiContext,loginPayload);
    response= await apiUtils.createOrder(createOrderPayload);

})


test('@API Ecommerce Validation',async({page})=>{


    await page.addInitScript(value=>{window.localStorage.setItem('token',value)},response.token);

    //const page = await browser.newContext().newPage();
    await page.goto("https://rahulshettyacademy.com/client");


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
            if(response.orderId.includes(rowOrderId)){
               await rows.nth(i).locator("button").first().click();
                break;
            }

   }

   //to verify the orderid in summary page
   const orderDetails = await page.locator("div.col-text").textContent();
   //await page.pause();
   expect(response.orderId.includes(orderDetails)).toBeTruthy();

   

})