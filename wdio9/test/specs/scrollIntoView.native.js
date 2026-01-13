import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Scroll into view in native app', () => {
    it('should scroll "Apps" button into view', async () => {
        
         await browser.execute('mobile: launchApp', { bundleId: 'com.apple.Preferences' });
        
        await browser.pause(3000); 
        // const contexts = await browser.getContexts();
        // console.log(contexts); // should list ["NATIVE_APP", "WEBVIEW_1", ...]

        // Switch to native context
        // await browser.switchContext('NATIVE_APP');

        // const appsMenu = await $('~Apps');
        const appsMenu = await $('[name="Apps"]');
        await appsMenu.scrollIntoView();
        
        await appsMenu.tap();
        
        await browser.pause(3000);  
    })
})

