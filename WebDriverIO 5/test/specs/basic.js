const assert = require('assert')
const Reporting = require('perfecto-reporting');

describe('webdriver.io page', () => {
    it('should have the right title', () => {
      try {
        browser.reportingClient.testStart('WebdriverIO Sample Test');
        browser.reportingClient.testStep('Step 1: Start browser');
        browser.url('https://webdriver.io')
        const title = browser.getTitle()
        assert.strictEqual(title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
        
        browser.reportingClient.stepEnd();
        browser.reportingClient.testStop({status: Reporting.Constants.results.passed });
      } catch (er) {
        console.log(er)
        browser.reportingClient.testStop({
          status: Reporting.Constants.results.failed,
          message: JSON.stringify(err)
        });
      }
    })
})