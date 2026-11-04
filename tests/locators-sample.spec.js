const{test,expect}=require('@playwright/test')

test('locators inbuilt',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();

    //getByPlaceholder
    await page.getByPlaceholder("Password").fill("abc123");

    //getByRole
    await page.getByRole("button",{name:"Submit"}).click();

    //getByText
    const bool = await page.getByText("The Form has been submitted successfully!.").isVisible();
    console.log(bool);

    //click shop by using getByRole
    await page.getByRole("link",{name:"Shop"}).click();

    //using smart filter going to click cart button of specific product
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();


})