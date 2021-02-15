module.exports = {
    // default: `--format-options '{"snippetInterface": "synchronous"}'`,
    cucumberOpts: {
        format: [require.resolve('cucumber-pretty')],
    },
};
// https://reports.cucumber.io/reports/df2d058e-a2ba-4d7e-a651-9207d78e706c
// ? Given I go to the regestration page by path "http://localhost:3000/"
//        Undefined. Implement with the following snippet:

//          Given('I go to the regestration page by path {string}', function (string) {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//    ? When click to header link with xpath "//a/span[text()='Кабинет']"
//        Undefined. Implement with the following snippet:

//          When('click to header link with xpath {string}', function (string) {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//    ? Then I get to the registration page by path "http://localhost:3000/login"
//        Undefined. Implement with the following snippet:

//          Then('I get to the registration page by path {string}', function (string) {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });