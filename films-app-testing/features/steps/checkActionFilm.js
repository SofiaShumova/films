const { Given, When, Then } = require('@cucumber/cucumber');
const { sleep, time } = require('../../helpers/sleep');
const { By } = require('selenium-webdriver');
// const { Driver } = require('../../helpers/Driver');
const assert = require('assert');

exports.addFilmFromCatalogy = (driver) => {
    Given('I go to catalogy page by path {string}', async function(path) {
        await driver.openPage(path);
    });

    When(
        'I select film and add to favorite list click by xpath {string}',
        async function(string) {
            await sleep(time);
            await driver.clickElementByXpath(string);
        }
    );
    When('I go to favorite list {string}', async function(string) {
        await sleep(4000);
        await driver.openPage(string);
    });

    Then('Check film in list with xpath {string}', async function(string) {
        await sleep(4000);
        await driver.findElementByXpath(string);
    });
    return driver;
};

exports.deleteFilmFromFavorite = (driver) => {
    When('I click by xpath {string}', async function(string) {
        await sleep(time);
        await driver.clickElementByXpath(string);
    });

    Then('Check film list with film-name {string}', async function(string) {
        await sleep(time);
        driver
            .findElementByXpath(`//*[text()='${string}]'`)
            .catch((e) => assert.ok(e));
    });
};