const Reporting = require('perfecto-reporting')
const authenticator = require('./authenticator.js');
const cloud = 'nab.perfectomobile.com';
const token = authenticator.getToken(cloud);
if (token === undefined)
{
  console.log("Stopping!")
  process.exit(1);
} 

let reportingClient;
let eyes;
let runner;
let configuration;
let reportUrl

const {
  Eyes,
  Target,
  VisualGridRunner,
  Configuration,
  RunnerOptions,
  BrowserType,
  BatchInfo,
  DeviceName,
  IosDeviceName,
  IosVersion,
  ConsoleLogHandler,
  ScreenOrientation,
  StitchMode
 } = require('@applitools/eyes-webdriverio');

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    //
    // applitoolsKey: 'Jc0wu6Y104nm9tcE4b4VvGyCDrnfUutSvTzqQxgQA0oUE110', // mine
    applitoolsKey: 'dP9g101q2APrfU2WEG98Yjqxha105KWKy3b22gH2rqNdoKt4110',
    protocol: 'https',
    hostname: cloud,
    port: 443,
    path: '/nexperience/perfectomobile/wd/hub/fast',

    specs: [
        './test/specs/applitools.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
   
    maxInstances: 1,
    capabilities: [
    //   {
    //     platformName: 'Android',
    //     browserName: 'Chrome' ,
    //       'perfecto:options': {
    //         securityToken: token,
    //         enableAppiumBehavior: true,
    //         useAppiumForWeb: true,
    //         platformVersion: '11'
    //       }
    // },
    {
      'perfecto:securityToken': token,
      platformName: 'Android',
      browserName: 'Chrome' ,
      // enableAppiumBehavior: true,
      // useAppiumForWeb: true,
      // platformVersion: '11',
      // 'setWindowRect': true,
        // 'perfecto:options': {
          // securityToken: token,
          'perfecto:enableAppiumBehavior': true,
          'perfecto:useAppiumForWeb': true,
          'perfecto:platformVersion': '11'
        // }
  }
  ],
    // capabilities: [{
          // Perfecto capabilities must be inside perfecto:options       
         // 'perfecto:options': {
          // securityToken: token,
          // 'enableAppiumBehavior': true,
          // 'useAppiumForWeb': true,
          // 'deviceName': '919X1VHD9'
         // 'deviceName': '99161FFBA003TV',
         // 'platformVersion': '11',
      // },
      // browserName: 'Chrome',
      // platformName: 'Android',
      // 'goog:chromeOptions': {
      //   'w3c': true,
      // },
    // }],
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 0,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
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
      /**
      // },
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    before: function (capabilities, specs) {
      // console.log("Starting before hook")
      browser.applitoolsKey = this.applitoolsKey
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
    beforeSuite: async function (suite) {
      console.log("Started beforeSuite()")
      // console.log("suite: ")
      // console.log( suite)
      // console.log(suite.title)
      reportingClient = new Reporting.Perfecto.PerfectoReportingClient(new Reporting.Perfecto.PerfectoExecutionContext({
        webdriver: {
          executeScript: (command, params) => {
            browser.execute(command, params);
          }
        },
        tags: ['hristog', 'applitools', 'wdio7']
      }));
      browser.reportingClient = reportingClient;
      reportUrl = browser.capabilities.testGridReportUrl
      console.log("report URL: " + reportUrl)

      try {
        runner = new VisualGridRunner(10);
        // runner = new RunnerOptions().testConcurrency(1);
        eyes = new Eyes(runner);
        
        eyes.setLogHandler(new ConsoleLogHandler(true));
        eyes.getLogHandler().setIsVerbose(true);

        configuration = eyes.getConfiguration();
        // configuration = new Configuration();
        configuration.setDisableBrowserFetching(false);
        configuration.setHideScrollbars(true);
        configuration.setHideCaret(true);
        configuration.setConcurrentSessions(20);
        configuration.setIgnoreDisplacements(true);
        configuration.setApiKey(this.applitoolsKey);
        // configuration.setStitchMode(StitchMode.CSS);

        configuration.setBatch(new BatchInfo('Ultrafast Batch'))
        // configuration.setServerUrl('https://nabeyesapi.applitools.com');

        dimensions = null;
        // configuration.addDeviceEmulation(DeviceName.Pixel_3, ScreenOrientation.PORTRAIT);
        // configuration.addDeviceEmulation(DeviceName.Pixel_3, ScreenOrientation.LANDSCAPE);

        configuration.setAppName(suite.fullTitle);
        configuration.setTestName(suite.fullTitle);

        eyes.setConfiguration(configuration);


        console.log("Trying to open eyes connection")

        await browser.url('http://google.com')
        // await eyes.open(browser);
        await eyes.open(browser, "NAB.COM.AU", suite.title);

        browser.eyes = eyes;
        browser.eyesTarget = Target;

      } catch (e) {
        console.log('Exception while eyes open', e);
        process.exit(1)  
      }
    },

    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
      //console.log("In beforeTest:")
      //console.log(test)
      //console.log(context)

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

      //console.log("after test. Status= " + passed);

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

    afterSuite: async function (suite) {
      console.log("Finished running suite " + suite.title)
      console.log("Status: " + browser.scenario_status)
    
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
      //console.log("ended afterSuite");
      // console.log("######## REPORTING URL ########")
      // console.log(browser.capabilities.testGridReportUrl)
      // console.log("")

      await eyes.abortAsync();
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
    after: async function (result, capabilities, specs) {
      //console.log('after() started');
      console.log("Reporting URL: " + browser.capabilities.testGridReportUrl);
      try {
        var start = (process.platform == 'darwin' ? 'open': process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(start + ' ' + browser.capabilities.testGridReportUrl);        
      } catch (err){
        console.log(err)
      } 

      if (runner !== undefined)
      {
        const results = await runner.getAllTestResults(false);
        console.log("APPLITOOLS RESULTS: ")
        console.log(results); 
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
    onComplete: function(exitCode, config, capabilities, results) {
      console.log(testGridReportUrl)
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
