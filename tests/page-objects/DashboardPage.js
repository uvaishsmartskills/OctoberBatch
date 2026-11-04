class DashboardPage{

    constructor(page){
        this.page=page;
        this.products= page.locator("div.card-body");
        this.productsText = page.locator(".card-body b");
        this.cart=page.locator("[routerlink*=cart]");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProduct(productName){
        await this.products.first().waitFor();
        const count = await this.products.count();
        for(let i=0;i<count;++i){
       //fetching product name from UI
       const name= await  this.products.nth(i).locator("b").textContent();
       if(name === productName){
            //add to cart
           await this.products.nth(i).locator("text= Add To Cart").click();
           break;
       }

    }

    }

    async navigateToCart(){
        await this.cart.click();

    }

     async navigateToOrders() {
        await this.orders.click();
    }


}

module.exports={DashboardPage};