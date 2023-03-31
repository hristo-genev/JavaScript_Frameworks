describe('Opening Settings app and typing some text', () => {
  it('setValue addValue', async () => {

    await browser.pause(2000);
    await browser.execute('mobile:application:close', { 'identifier': 'com.android.settings' });
    await browser.execute('mobile:application:open', { 'identifier': 'com.android.settings' });    
    await browser.pause(3000);
    await browser.switchContext('NATIVE_APP');
    let el = await $('//*[contains(@content-desc,"Search")]')
    await el.click()        
    el = await $('//*[@resource-id="com.android.settings.intelligence:id/search_src_text"]')
    await el.setValue("setting-value")
    await browser.pause(1000);
    await el.setValue("setting-value2")
    await browser.pause(1000);
    await el.addValue("adding-value")
    
    // await el.getText()

    // expect(el).toHaveText("SetValueAppendedValue")

    // await el.clearValue()

    await browser.pause(3000);

  });
});
