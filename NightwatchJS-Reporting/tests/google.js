const Reporting = require('perfecto-reporting');

module.exports = {

  before: function (browser) {
    console.log('Setting up...');

    // Setup Perfecto reporting client
    const perfectoExecutionContext = new Reporting.Perfecto.PerfectoExecutionContext({
      webdriver: {
        executeScript: (command, params) => {
          browser.execute(command, [params])
        }
      },
      job: new Reporting.Model.Job("Job name", 1234), // optional
      project: new Reporting.Model.Project("Project name", "v0.1"), // optional
      tags: ['optional tag 1', 'optional tag 2'] // optional
    });

    browser.reporting = new Reporting.Perfecto.PerfectoReportingClient(perfectoExecutionContext);

    browser.reporting.testStart('Google Nightwatch Demo', ['tag1', 'tag2']);
  },

  after: function (browser) {

    let varSuccess = (this.results.failed == 0) ? true : false;

    /**
     * determines the test's result and pass it to Reporting
     */
    if (varSuccess) {
      browser.reporting.testStop({
        status: Reporting.Constants.results.passed
      })
    } else {
      browser.reporting.testStop({
        status: Reporting.Constants.results.failed,
        // Will pass the first error (could be more then one)
        message: this.errors[0].substr(0,4095)
      })
    }

    console.log(this.errors);
    console.log('Closing down...');
    // console.log('Report URL: ' + browser.reporting.getReportUrl())
    browser.end();
  },

  beforeEach: function (browser) {
  },

  afterEach: function (browser, done) {
    done();
  },
  tags: ['Nightwatch'],

  'Step 1: Navigate': function (browser) {
    browser.reporting.stepStart('Step 1 - Navigate');
    browser.url('http://google.com');
    browser.reporting.stepEnd('End Step 1');
  },

  'Step 2: Open Menu': function (browser) {
    browser.reporting.stepStart('Step 2 - Open Menu');
    browser.pause(1000);
    browser.reporting.stepEnd('End Step 2');
  }
};