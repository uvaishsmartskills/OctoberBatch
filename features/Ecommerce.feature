Feature: Ecommerce Validation

    @Regression
    Scenario: Placing the order

        Given Login to Ecommerce application with "uvaishsmartskills@gmail.com" and "practice"
        When Add "ZARA COAT 4" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify order is present in the OrderHistory

    Scenario Outline: Validation of practise page

        Given Login to Ecommerce rahul application with "<username>" and "<password>"
        When Verify the error message

        Examples:
            | username      | password |
            | abc@gmail.com | qwerty   |
            | xyz@gmail.com | asdfg    |




