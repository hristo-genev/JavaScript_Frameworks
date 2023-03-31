describe('Typing to navigate to DuckDuckGo website and search', () => {
  it('should load perfecto results', async () => {

    await browser.url('https://google.com/')

    await browser.pause(5000)
    
    let el = await $('[name="q"]');

    await el.setValue('perfecto by perforce')

    await browser.saveScreenshot('screenshots/afterInput.png');
    
    el = await $('[name=btnK]')

    el.click()        

    await browser.pause(3000);

    await browser.saveScreenshot('screenshots/afterSubmit.png');
  });
});
