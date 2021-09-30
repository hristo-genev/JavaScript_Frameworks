describe('Typing and keys demo', () => {
  it('should type something and hit backspace', async () => {

    await browser.url(`https://the-internet.herokuapp.com/login`)
    let input = await $('#username');
    await input.setValue('tomsmith12')
   
    await browser.saveScreenshot('screenshots/beforeBackspace.png');

    browser.keys('Backspace')
    browser.keys('Backspace')

    await browser.saveScreenshot('screenshots/afterBackspace.png');

    await browser.keys('Tab')
    await browser.saveScreenshot('screenshots/afterTabKey.png');

    await $('#password').setValue('SuperSecretPassword!')
    
    await browser.saveScreenshot('screenshots/beforeEnter.png');
    await browser.keys('Enter')
    await browser.saveScreenshot('screenshots/afterEnter.png');

    $('a.button.secondary').isDisplayed()
    
    await browser.pause(3000);
  });
});
