const { Given, When, Then } = require('@cucumber/cucumber');
const { sleep, time } = require('../../helpers/sleep');

exports.checkRegistrationPage = (driver) => {
    Given(
        'I go to the registration page by path {string}',
        async function(path) {
            await driver.openPage(path);
        }
    );

    When('click to link with xpath {string}', async function(string) {
        await sleep(2000);
        await driver.clickElementByXpath(string);
    });

    Then('I get to the registration page by path {string}', async function(url) {
        await sleep(time);
        await driver.checkPageUrl(url);
    });

    return driver;
};