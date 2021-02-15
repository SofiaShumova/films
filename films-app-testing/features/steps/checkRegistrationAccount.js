const { When, Then } = require('@cucumber/cucumber');
const { sleep, time } = require('../../helpers/sleep');

exports.checkRegistrationAccount = (driver) => {
    When(
        'register with email {string} by xpath {string}',
        async function(email, xpath) {
            await driver.findByXpathAndSendKeys(xpath, email);
        }
    );
    When('input {string} by xpath {string}', async function(data, xpath) {
        await driver.findByXpathAndSendKeys(xpath, data);
    });
    When('click to button by xpath {string}', async function(string) {
        await sleep(time);
        await driver.clickElementByXpath(string);
    });
    Then('I get account page by path {string}', async function(url) {
        await sleep(time);
        await driver.checkPageUrl(url);
    });

    return driver;
};