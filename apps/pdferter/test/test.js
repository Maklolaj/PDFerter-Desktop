const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')

describe('Application launch', function () {
  this.timeout(30000)
  const sleep = ms => new Promise(res => setTimeout(res, ms));

  const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '../../../dist/index.html')]
  })

  before(() => app.start());
  
  after(() => {
      sleep(10000).then( async () => {
        app.stop()
      });
  });


  it('shows an initial window', async () =>{
      const count = await app.client.getWindowCount();
      assert.equal(count, 1)
  })
})