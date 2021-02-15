Feature: Project features

    Scenario: Check input account page
        Given I go to the input account page by path "http://localhost:3000/"
        When click to nav link with xpath "//a/span[text()='Кабинет']"
        Then I get to the input account page by path "http://localhost:3000/login"

    Scenario: Check registration page
        Given I go to the registration page by path "http://localhost:3000/login"
        When click to link with xpath "//a[text()='Регистрация']"
        Then I get to the registration page by path "http://localhost:3000/register"

    Scenario: Check registration account
        Given I go to the registration page by path "http://localhost:3000/register"
        When register with email "test@test.com" by xpath "//input[@name='email']"
        And input "test" by xpath "//input[@name='username']"
        And input "123" by xpath "//input[@name='password']"
        And click to button by xpath "//button[text()='Зарегистрироваться']"
        Then I get account page by path "http://localhost:3000/account"

    Scenario: Check logout account
        Given I go to account page by path "http://localhost:3000/account"
        When I clicked button logout by xpath "//a[text()='Выход']"
        Then I get login page "http://localhost:3000/login"

    Scenario: Check login account
        Given I go to account page by path "http://localhost:3000/login"
        When I input email "test@test.com" by xpath "//input[@name='email']"
        And input password "123" by xpath "//input[@name='password']"
        And clicked button login by xpath "//button[text()='Войти']"
        Then I get account page "http://localhost:3000/account"

    Scenario: Add film from catalogy to favorite list
        Given I go to catalogy page by path "http://localhost:3000/catalogy"
        When I select film and add to favorite list click by xpath "//span[text()='Зеленая миля']/following-sibling::div/a"
        And I go to favorite list "http://localhost:3000/favorite"
        Then Check film in list with xpath "//h3[text()='Зеленая миля']"

    Scenario: Delete film from favorite list
        Given I go to favorite list "http://localhost:3000/favorite"
        When I click by xpath "//h3[text()='Зеленая миля']/parent::*/parent::*/following-sibling::*"
        Then Check film list with film-name "Зеленая миля"

    Scenario: Check delete account
        Given I go to the account page by path "http://localhost:3000/account"
        When I clicked button by xpath "//a[text()='Удалить аккаунт']"
        And input password "123" for verify in xpath "//input"
        And clicked button send by xpath "//button [@type='submit']"
        Then I get account page by path "http://localhost:3000/login"

