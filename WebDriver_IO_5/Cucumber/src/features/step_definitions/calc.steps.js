import { Given, When, Then } from 'cucumber';
import calcPage from '../../pageobjects/calc.page';

Given(/^I send a message$/, () => {
     console.log('Hello World');
});

Given(
    /^I start application by name "([^"]*)"$/,
    (appName) => {
      console.log("appName: " + appName);
      console.log("flag_run_mode: " + flag_run_mode);
      if (flag_run_mode === 'perfecto') {
        browser.execute('mobile:application:open', {'name': appName});
      }
      browser.switchContext('NATIVE_APP');
      browser.pause(3000);
    });

When(
    /^I add (\d+) to (\d+)$/,
    (num1, num2) => {
      calcPage.add(num1, num2);
      browser.pause(1000);
    });

Then(
    /^the result should be (\d+)$/,
    (sum) => {
      console.log("Then step started with " + sum);
      calcPage.verifyResult(sum);
    });