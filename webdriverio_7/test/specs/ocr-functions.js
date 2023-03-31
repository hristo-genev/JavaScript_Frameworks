const assert = require('assert')

describe('OCR functions', () => {
    it('Button Click', async () => {

        var params = {};
        params = {
            identificator: 'com.apple.Settings'
        };

        await browser.execute('mobile:application:open', params);
        
        params = {
            label: 'Settings',
            threshold: 80,
            operation: 'single',
            timeout: '5',
            ignorepunct: 'punct',
        };

        await browser.execute('mobile:button-text:click', params);


  })
})