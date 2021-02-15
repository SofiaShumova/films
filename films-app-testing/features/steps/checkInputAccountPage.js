const { Given, When, Then } = require('@cucumber/cucumber');
const { sleep } = require('../../helpers/sleep');

exports.checkInputAccountPage = (driver) => {
    Given(
        'I go to the input account page by path {string}',
        async function(path) {
            await driver.openPage(path);
        }
    );

    When('click to nav link with xpath {string}', async function(string) {
        await driver.clickElementByXpath(string);
    });

    Then(
        'I get to the input account page by path {string}',
        async function(url) {
            await sleep(4000);
            await driver.checkPageUrl(url);
        }
    );
    return driver;
};