var env = require('getenv');
const default_token = '';
const default_host = '.perfectomobile.com';

module.exports = (function () {
  return {
    "src_folders": ["tests"],
    "custom_commands_path": "",
    "custom_assertions_path": "",
    "globals_path": "",
    "selenium": {
      "start_process": false
    },
    "test_settings": {
      "default" : {
        "use_ssl": true,
        "default_path_prefix": "/nexperience/perfectomobile/wd/hub/fast",
        "selenium_port": 443,
        "selenium_host": default_host,
        "end_session_on_fail": false,
        "desiredCapabilities": {
          "securityToken": default_token 
        }
      },
      "windows_chrome": {
        "desiredCapabilities": {
          'platformName': 'Windows',
          'platformVersion': '10',
          'browserName': 'Chrome',
          'browserVersion': 'latest',
          'location': 'US East',
          'resolution': '1280x1024'
        }
      }
    }
  }
})();