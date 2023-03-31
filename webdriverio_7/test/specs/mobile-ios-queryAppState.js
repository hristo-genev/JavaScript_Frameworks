const assert = require('assert')

describe('Check App State', () => {
    it('app should be in FOREGROUND state', async () => {
  
    const state = await driver.queryAppState('com.apple.Preferences')
      
    console.log('App state is: ' + state)
  
    assert.strictEqual(state, 4)
  })
})

