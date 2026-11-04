const{test,expect}= require('@playwright/test');

test('@web dropdown test',async({page})=>{

    //dropdown
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("Teacher");
    
    //radio button (with assertion)
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();

    //to check the button in checked or not
    const isChecked = await page.locator(".radiotextsty").nth(1).isChecked(); ///true or false
    console.log(isChecked);

    //to assert the button is checked or not
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();

    //check box click
    await page.locator("#terms").click();  //alternative method check()
    await page.locator("#terms").uncheck(); // to uncheck the checkbox

    //check box validation
                //false                              //false
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //test pass


    //assertion on attribute
    const documentLink = page.locator("[href*=documents]");
    await expect(documentLink).toHaveAttribute("class","blinkingText");

   //await page.pause();

})

test('@web Handling window',async({browser})=>{

    //context and page
    const context = await browser.newContext();
    const page =await context.newPage();

     //locators
    const documentLink = page.locator("[href*='documents']");
    
    //go thr url
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //click the link
    
    //Promise ---- fulfill,pending,rejected
   
    const [newpage] = await  Promise.all([
    context.waitForEvent('page'),   //wait for the new page
    documentLink.click()            //click the blinking text      
    ])

    

   //retrive the red text
   const redText=  await newpage.locator("[class*=red]").textContent();
   console.log(redText);

   //to split domain alone(rahulshettyacademy.com)
   const textWithDomain = redText.split("@")[1];
   const domain = textWithDomain.split(" ")[0];

   //filling the domain in parent window(first tab)
   await page.locator("#username").fill(domain);


   //await page.pause();


})
