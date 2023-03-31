describe('Typing to navigate to website and find elements', () => {
  it('should load url and type', async () => {

    await browser.url('https://the-internet.herokuapp.com/login')

    let el = await $('#username');

    await el.addValue('to-be-deleted')
    await el.setValue('hristog')
    await el.addValue("АppendedUsername2")
    // await expect(el).toHaveValue("hristogАppendedUsername2")
     n  el.getValue()

    await browser.pause(1000);    

    el = await $('#password')
    await el.setValue('Part1')
    // await el.clearValue()
    
    // await browser.saveScreenshot('screenshots/afterInput.png');
    

    el = await $('button[type="submit"]')

    el.click()        

    await browser.pause(3000);

    // await browser.saveScreenshot('screenshots/afterSubmit.png');
  });
});
