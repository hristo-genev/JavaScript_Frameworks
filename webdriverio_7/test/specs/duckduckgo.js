describe('Typing to navigate to DuckDuckGo website and search', () => {
  it('should load perfecto results', async () => {

    await browser.url('https://duckduckgo.com/')

    let el = await $('#search_form_input_homepage');

    await el.setValue('perfecto by perforce')

    await browser.saveScreenshot('screenshots/afterInput.png');
    
    el = await $('#search_button_homepage')

    el.click()        

    await browser.pause(3000);

    await browser.saveScreenshot('screenshots/afterSubmit.png');
  });
});
