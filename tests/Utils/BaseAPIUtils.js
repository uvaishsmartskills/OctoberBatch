class BaseAPIUtils{
    constructor(apiContext,loginPayload){
            this.apiContext=apiContext;
            this.loginPayload=loginPayload;
    }


    //getToken()=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9,........
    async getToken(){ 
    //Login
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayload});
    const loginResponseJson = await loginResponse.json();
    const tokenExtracted = loginResponseJson.token;
    //console.log(tokenExtracted); 
    return tokenExtracted;

    }

    //createOrder()= orederId,token
    async createOrder(createOrderPayload){

        let response={};
        response.token =await this.getToken();

         //create order
            const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {data:createOrderPayload ,
                headers:{
                        'authorization':response.token,
                        'content-type':'application/json'
                }
            }
            )
          const orderJson=  await orderResponse.json();
          console.log(orderJson)
          const orderId = orderJson.orders[0];

          response.orderId=orderId;

          return response;

    }

}
module.exports={BaseAPIUtils};
