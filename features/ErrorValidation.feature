Feature: Ecommerce Validation

    @Validation @foo
    Scenario Outline: Placing the order

        Given Login to Ecommerce rahul application with "<username>" and "<password>"
        When Verify the error message

        Examples:
            | username      | password |
            | abc@gmail.com | qwerty   |
            | xyz@gmail.com | asdfg    |

