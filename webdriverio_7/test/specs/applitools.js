describe('Trying Applitools', () => {
  it('Load page and runs Eyes.check', async () => {

    let eyes = browser.eyes;
    let Target = browser.eyesTarget;

    await browser.url('https://perfecto.io')
    await browser.pause(5000);

    await eyes.check('Perfecto', 
      Target.window().fully()
      // .beforeRenderScreenshotHook("document.querySelector('html').style.height='auto';document.querySelector('body').style.overflow='auto';document.body.style='transform:translate(0px,0px)';")
      );

      await eyes.closeAsync();
  });
});
