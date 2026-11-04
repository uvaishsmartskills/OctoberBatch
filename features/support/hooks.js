const { Before, After,Status,BeforeStep,AfterStep} = require('@cucumber/cucumber')
const { POManager } = require('../../tests/page-objects/POManager');
const { test, expect, chromium } = require('@playwright/test');
//Before each scenario
Before(async function () {
    const browser = await chromium.launch(
        { headless: false }
    );
    const context = await browser.newContext();
    this.page = await context.newPage();
    //pom manager object
    this.pomManager = new POManager(this.page);

})

//After each sceanrio
After(async function () {
    console.log("I am last to execute");

})

//tagged hooks
BeforeStep({tags: "@foo"},async function() {
    
})

AfterStep(async function({result}) {
   if(result.status === Status.FAILED){
        await this.page.screenshot({path:"erroeValidation.png"});
    }
})
