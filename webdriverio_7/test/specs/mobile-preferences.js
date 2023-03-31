describe('Typing to navigate to DuckDuckGo website and search', () => {
  it('should load perfecto results', async () => {

    // let appName = 'com.apple.Preferences'
    // await browser.execute('mobile:application:open', {'name': appName});

    browser.switchContext('NATIVE_APP');

    let el = await $('//*[@label="General"]');
    el.click()        

    await browser.pause(3000);
    // console.log(browser.getPageSource())

  });
});
