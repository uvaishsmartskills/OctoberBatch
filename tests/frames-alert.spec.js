const {test,expect}= require('@playwright/test')

test('@smoke Alert Frame Handling',async({page})=>{


  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//   await page.goto("https://www.google.com/");
//   await page.goBack(); // navigate back
//   await page.goForward();// navigate forward

    //Element is visible or not
   await expect(page.locator("#displayed-text")).toBeVisible();  //pass

    //to hide the textbox
   await page.locator("#hide-textbox").click();

    //Element is hidden or not
   await expect(page.locator("#displayed-text")).toBeHidden();  //pass


   //to handle alert  ==>accept()-ok   , dismiss()-cancel
   page.on("dialog",dialog=>dialog.accept());

   //to click confirm button
   await page.locator("#confirmbtn").click();

   //mousehover
   await page.locator("#mousehover").hover();

  // await page.pause();


  //to locate and switchTo Frame
  const framePage=  page.frameLocator("#courses-iframe");

  //to click the all access plan link
  await framePage.locator("li a[href=lifetime-access]:visible").click();

  //to grab the text
  const text = await framePage.locator(".text h2").textContent();

  //to split the number and print
  const numberText = text.split(" ")[1];
  console.log(numberText);


})