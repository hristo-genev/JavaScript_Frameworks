const Reporting = require('perfecto-reporting')
const authenticator = require('./authenticator.js');
const cloud = 'ps.perfectomobile.com';
const token = authenticator.getToken(cloud);
if (token === undefined)
{
  console.log("Stopping!")
  rocess.exit(1);
} 
var reportingClient;

exports.config = {
    hostname: cloud,
    port: 80,
    path: '/nexperience/perfectomobile/wd/hub/fast',
    specs: [
        './test/specs/google.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [{
        // Perfecto capabilities must be inside perfecto:options
        'perfecto:options': {
          securityToken: token,
          enableAppiumBehavior: true,
          useAppiumForWeb: true,
          deviceSessionId: '5b9c39ec-ace9-4f53-8f9f-a2f2bc968338'
        },
        platformName: 'iOS',
        browserName: 'Safari',
        'perfecto:enableAppiumBehavior': true,
        'perfecto:useAppiumForWeb': true,
    }],
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: ['chromedriver'],
    
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec'],
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    before: function (capabilities, specs) {
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
      console.log("In beforeSuite()")
      // console.log("suite: ")
      // console.log( suite)
      reportingClient = new Reporting.Perfecto.PerfectoReportingClient(new Reporting.Perfecto.PerfectoExecutionContext({
        webdriver: {
          executeScript: (command, params) => {
            browser.execute(command, params);
          }
        },
        tags: ['hristog', 'wdio7']
      }));
      browser.reportingClient = reportingClient;
    },

    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
      console.log("In beforeTest:")
      console.log(test)
      console.log(context)

      browser.scenario_status=0
      browser.reportingClient.testStart(test.title);
      browser.pause(500)
    },

    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */


    afterTest: function(test, context, { error, result, duration, passed, retries }) {

      console.log("after test. Status= " + passed);

      if (passed === false) {
        console.log("* * * result get the error " + error.stack);
        browser.failed++;
        browser.failMessage = error.stack;
        // browser.reportingClient.reportiumAssert(browser.failMessage.message, false);
      };

      if (passed === 'undefined') {
        browser.failed++
        browser.failMessage = {
          AssertionError: `undefined step ${stepData.step.text}`,
          message: `undefined step ${stepData.step.text}`
        }
        // browser.reportingClient.reportiumAssert(browser.failMessage.message, false)
      };
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */

    afterSuite: function (suite) {
      console.log("Finished running suite " + suite.title)
      console.log("status: " + browser.scenario_status)
    
      if(browser.scenario_status==0){
        browser.reportingClient.testStop({
          status: Reporting.Constants.results.passed
        });

      } else {

        browser.reportingClient.testStop({
          status: Reporting.Constants.results.failed,
          message: JSON.stringify("")
        })
      }
      browser.pause(500)
      console.log("ended afterSuite");
      console.log("######## REPORTING URL ########")
      console.log(browser.capabilities.testGridReportUrl)
      console.log("")
   },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },


    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
      console.log('after() started');
      console.log("Reporting URL: " + browser.capabilities.testGridReportUrl);
      try {
        var start = (process.platform == 'darwin' ? 'open': process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(start + ' ' + browser.capabilities.testGridReportUrl);        
      } catch (err){
        console.log(err)
      } 
      console.log("after() ended");
    },


    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
