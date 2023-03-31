describe('Opening Settings app and typing some text', () => {
  it('setValue addValue', async () => {

    await browser.pause(2000);

    // await browser.execute('mobile:application:close', { 'identifier': 'com.apple.preferences' });
    await browser.execute('mobile:application:open', { 'identifier': 'com.apple.Preferences' });

    await browser.switchContext('NATIVE_APP');
    let el = await $('//*[@label="Search"]')
    await el.click()        
    await el.setValue("value1")
    await el.addValue("appendix")
    
    // await el.getText()

    // expect(el).toHaveText("SetValueAppendedValue")

    // await el.clearValue()

    await browser.pause(3000);

  });
});
