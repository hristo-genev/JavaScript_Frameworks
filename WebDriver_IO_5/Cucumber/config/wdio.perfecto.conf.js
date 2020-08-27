const path = require('path');
const Reporting = require('perfecto-reporting');
const authenticator = require('./authenticator.js');
const host = 'demo';
// Enable proxy, set GLOBAL_AGENT_HTTP_PROXY=http://127.0.0.1:8889
// require('global-agent/bootstrap')

global.flag_run_mode = 'perfecto';
securityToken = authenticator.getToken(host);

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    //runner: 'local',
    //
    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually obsolete as
    // WebdriverIO automatically connects to localhost. However, if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    protocol: 'http',
    hostname: host + '.perfectomobile.com',
    path: '/nexperience/perfectomobile/wd/hub',
    port: 80,
    //
    // Override default path ('/wd/hub') for chromedriver service.
    //
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
      './Cucumber/src/features/*.feature'
    ],
    exclude: [
      // './Cucumber/src/features/calcTests.feature',
      './Cucumber/src/features/webTests.feature',
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,

    capabilities: [
      // {
          // maxInstances: 1,
          // shardTestFiles: false,
          // browserName: 'chrome',
          // manufacturer: 'Samsung',
          // platformName: 'Android',
          // securityToken: securityToken,
          // enableAppiumBehavior: true,
          // useAppiumBehavior: true,
          // deviceName: '4956523730493498'
      // }
      // ,
      {
        maxInstances: 1,
        shardTestFiles: false,
        platformName: 'iOS',
        securityToken: securityToken,
        enableAppiumBehavior: true,
        useAppiumForWeb : true,
        useAppiumForHybrid: true,
        deviceName: '00008030-00194CCE2100802E'
      }
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'trace',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevels: {
        'webdriver': 'trace',
        '@wdio/cucumber-framework': 'trace'
    },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    //baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
  //  services: ['chromedriver'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec'],
 //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./Cucumber/src/features/step_definitions/*.js'],      // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        requireModule: ['@babel/register'],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tagExpression: '@calcSimpleTest or @calcSimpleTest2 or @webTest',  // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 30000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        compiler: ['js:babel-core/register']
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
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     beforeSession: function (config, capabilities, specs) {
        // console.log("beforeSession started")
        // console.log("beforeSession ended")
     },

    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     before: function (capabilities, specs) {
        console.log("before started");

        const chai    = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
        console.log("Report UTL: " + browser.capabilities.testGridReportUrl);
        console.log("before ended");
     },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs before a Cucumber feature
     */
     beforeFeature: function (uri, feature, scenarios) {
        // console.log(feature)
        // console.log(scenarios)
        console.log("#######################################################");
        console.log("# Starting feature " + feature.document.feature.name)
        console.log("#######################################################");

        reportingClient = new Reporting.Perfecto.PerfectoReportingClient(new Reporting.Perfecto.PerfectoExecutionContext({
            webdriver: {
                executeScript: (command, params) => {
                    browser.execute(command, params);
                }
            },
            // tags: tags
            // customFields: [new Reporting.Model.CustomField('testIndex', '1')],

        }));

        browser.reportingClient = reportingClient;
     },
    /**
     * Runs before a Cucumber scenario
     */
     beforeScenario: function (uri, feature, scenario, sourceLocation) {
        console.log()
        console.log()
        console.log("#######################################################");
        console.log("# Starting test: " + scenario.name)
        console.log("# uri: " + uri)
        // console.log(sourceLocation)
        console.log("#######################################################");
        
        var tags = [];
        for (var i=0; i <scenario.tags.length; i++){
            tags.push(scenario.tags[i].name);
        }

        browser.reportingClient.perfectoExecutionContext.tags = tags;
        browser.failed = 0;
        browser.reportingClient.testStart(scenario.name);
     },
    /**
     * Runs before a Cucumber step
     */
     beforeStep: function (uri, feature, stepData, context) {
       console.log("#######################################################");
       console.log(`# Starting step: ${stepData.step.keyword} ${stepData.step.text}`);
       console.log("#######################################################");

        // if(browser.failed == 0) {
        browser.reportingClient.stepStart(`${stepData.step.keyword} ${stepData.step.text}`)
        // }
     },
    /**
     * Runs after a Cucumber step
     */
    afterStep: function (uri, feature, { error, result, duration, passed }, stepData, context) {
      status = passed ? "PASSED" : "FAILED"
      console.log("#######################################################");
      console.log("# Step '" + stepData.step.text + "' ended with status: " + status);
      console.log("#######################################################");
      if (passed !== true) {
        console.log("Error: " + error.stack);
        browser.failed++;
        browser.failMessage = error.stack;
        browser.reportingClient.reportiumAssert(browser.failMessage, false);
      }
      else
      {
        browser.reportingClient.reportiumAssert("Assert success", true);
      }

      // if (passed === 'undefined'){
        // browser.failed++
        // browser.failMessage = "undefined step " + stepData.step.text;
        // browser.reportingClient.reportiumAssert(browser.failMessage, false);
      // }
        
     },
    /**
     * Runs after a Cucumber scenario
     */
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
      console.log("afterScenario started");
      console.log("#######################################################");
      console.log("# Ended scenario: " + scenario.name);
      console.log("#######################################################");
      // console.log(scenario);

      if( browser.failed != 0){
        message = browser.failMessage ? browser.failMessage : "Unknown failure"
        console.log("browser.failed count: " + browser.failed)
        browser.reportingClient.testStop({
          status: Reporting.Constants.results.failed,
          message: message
        });
      } else {
        browser.reportingClient.testStop({
          status: Reporting.Constants.results.passed
        });
      }
      console.log("afterScenario ended");
    },
    /**
     * Runs after a Cucumber feature
     */
    afterFeature: function (uri, feature, scenarios) {
      console.log("afterFeature started")
      // console.log(uri)
      console.log("#######################################################");
      console.log("Finished feature " + feature.document.feature.name)
      console.log("#######################################################");
      // console.log(scenario)
      console.log("afterFeature ended")
    },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
      // console.log("afterCommand() started");
      // console.log(commandName);
      // console.log(args);
      // console.log(result);
      // console.log(error);
      // console.log("afterCommand() ended");
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
      console.log("after() started");
      console.log("#######################################################")
      console.log("Report URL: " + browser.capabilities.testGridReportUrl)
      console.log("#######################################################")
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
      // console.log("afterSession started")
      // console.log("afterSession ended")
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
      // console.log("onComplete() started");
      // console.log(exitCode);
      // console.log(config);
      // console.log(capabilities);
      // console.log(results);

      // console.log("onComplete() ended");
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
