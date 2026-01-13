import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Scroll into view and tap on webpage test', () => {
    it('should scroll into view and tap', async () => {
        
        await browser.url(`https://the-internet.herokuapp.com/large`)
        
        await browser.pause(3000); 
        
        const links = await $$('a'); // selects all <a> elements
        await browser.pause(3000);   // small pause to ensure page loaded

        if (links.length >= 2) {
            await links[1].tap();
        } else {
            throw new Error('Not enough links found on the page.');
        }

        await browser.pause(3000);  
    })
})

