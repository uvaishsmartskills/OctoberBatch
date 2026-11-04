const base = require('@playwright/test')



exports.customtest = base.test.extend({

    //fixture name
    testDataForOrder: {
        username: "uvaishsmartskills@gmail.com",
        password: "practice",
        productName: "ZARA COAT 3"

    }


})

