describe('Opening Lloyds app and typing some text', () => {
  it('should click and type', async () => {

    await browser.pause(2000);
    await browser.execute('mobile:application:close', { 'name': 'com.grppl.android.shell.BOS.qaBuildType' });
    await browser.execute('mobile:application:open', { 'name': 'com.grppl.android.shell.BOS.qaBuildType' });

    await browser.switchContext('NATIVE_APP');

    const envStubTextBox = await browser.$('//android.widget.EditText[contains(@resource-id,":id/environmentQuickStubText")]');
    await envStubTextBox.waitForDisplayed({ timeout: 3000 });

    await browser.switchContext('NATIVE_APP')
    await envStubTextBox.clearValue();

    const textToEnter = 'Lloyds';

    for await (const char of [...textToEnter]) {
        await browser.switchContext('NATIVE_APP')
        await envStubTextBox.addValue(char);
    }

    await browser.switchContext('NATIVE_APP')
    await browser.pause(5000);

    await browser.pause(3000);

  });
});
