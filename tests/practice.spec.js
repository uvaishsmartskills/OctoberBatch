const {test}=require('@playwright/test')
test('Validation of Table',async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table = page.locator(".table");
    const chromeRow = table.locator('tr').filter({hasText:'Chrome'});
    const headers = table.locator('thead th');
    const count = await headers.count();
    let networkColumnIndex =-1;
    for(let i=0;i<count;i++){
        const text = await headers.nth(i).textContent();
        if(text==='Network'){
            networkColumnIndex=i;
            break;
        }
   }
    const networkSpeed = await chromeRow.locator('td').nth(networkColumnIndex).textContent();
    console.log(networkSpeed);
})