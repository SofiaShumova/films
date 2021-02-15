const { After, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);
const { Driver } = require('../helpers/Driver');
const { checkInputAccountPage } = require('./steps/checkInputAccountPage');
const {
    checkRegistrationAccount,
} = require('./steps/checkRegistrationAccount');
const { checkRegistrationPage } = require('./steps/checkRegistrationPage');
const {
    checkLogoutAccount,
    checkLoginAccount,
    checkDeleteAccount,
} = require('./steps/checkActionAccount');
const {
    addFilmFromCatalogy,
    deleteFilmFromFavorite,
} = require('./steps/checkActionFilm');

const start = async(driver) => {
    checkInputAccountPage(driver);
    checkRegistrationPage(driver);
    checkRegistrationAccount(driver);
    checkLogoutAccount(driver);
    checkLoginAccount(driver);
    addFilmFromCatalogy(driver);
    deleteFilmFromFavorite(driver);
    checkDeleteAccount(driver);
    After(function(scenarioResult) {
        const scenario = scenarioResult.pickle;
        console.log('\nScenarion execution completed:', scenario.name);
    });
    AfterAll(async function() {
        await driver.quit();
    });
};

start(new Driver('chrome'));