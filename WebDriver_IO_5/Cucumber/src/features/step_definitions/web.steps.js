import { Given, When, Then } from 'cucumber';
// import calcPage from '../../pageobjects/calc.page';



Given(
    /^I go to "([^"]*)"$/,
    (url) => {
         console.log("Going to URL: " + url);
         browser.url(url);
         browser.switchContext('WEBVIEW');
         browser.pause(5000)
    });

Then(
    /^I wait "(\d+)" seconds for element with xpath "(.*)" to exist$/,
    (seconds, xpath) => {
      // browser.switchContext('NATIVE_APP');
      console.log("Waiting " + seconds + " seconds for element with xpath " + xpath + " to exist")
      console.log("executing element.waitForExist({ timeout: " + (seconds * 1000) + "})")
      $(xpath).waitForExist({timeout: seconds * 1000});
    });

Then(
    /^the result should be "(\d+)"$/,
    (result) => {
         console.log(result);
         // calcPage.verifyResult(result);
    });


