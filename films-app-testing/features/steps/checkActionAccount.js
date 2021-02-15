const { Given, When, Then } = require('@cucumber/cucumber');
const { sleep, time } = require('../../helpers/sleep');

exports.checkLogoutAccount = (driver) => {
    Given('I go to account page by path {string}', async function(path) {
        await driver.openPage(path);
    });
    When('I clicked button logout by xpath {string}', async function(string) {
        await sleep(4000);
        await driver.clickElementByXpath(string);
    });

    Then('I get login page {string}', async function(url) {
        await sleep(time);
        await driver.checkPageUrl(url);
    });

    return driver;
};

exports.checkLoginAccount = (driver) => {
    When(
        'I input email {string} by xpath {string}',
        async function(data, xpath) {
            await driver.findByXpathAndSendKeys(xpath, data);
        }
    );
    When(
        'input password {string} by xpath {string}',
        async function(data, xpath) {
            await driver.findByXpathAndSendKeys(xpath, data);
        }
    );
    When('clicked button login by xpath {string}', async function(string) {
        await sleep(4000);
        await driver.clickElementByXpath(string);
    });
    Then('I get account page {string}', async function(url) {
        await sleep(time);
        await driver.checkPageUrl(url);
    });

    return driver;
};

exports.checkDeleteAccount = (driver) => {
    Given('I go to the account page by path {string}', async function(path) {
        await driver.openPage(path);
    });
    When(
        'input password {string} for verify in xpath {string}',
        async function(data, xpath) {
            await sleep(time);
            await driver.findByXpathAndSendKeys(xpath, data);
        }
    );
    When('I clicked button by xpath {string}', async function(string) {
        await sleep(time);
        await driver.clickElementByXpath(string);
    });
    When('clicked button send by xpath {string}', async function(string) {
        await sleep(time);
        await driver.clickElementByXpath(string);
    });
    return driver;
};