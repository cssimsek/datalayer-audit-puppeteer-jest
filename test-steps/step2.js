const gdts = require('../utilities/getdatatakescreenshot');

async function takeStep(page,opts) {

    await page.waitFor('.privacy-prompt-footer>a');


    page.on('dialog', async dialog => {
        await console.log(dialog.message());
        await page.waitFor(2000);
        await dialog.dismiss();
      });

    //Click Cookie Consent Banner
    const bannerClicked = await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('.privacy-prompt-footer>a').click());
    }); 

    await page.evaluate(() => alert('Cookie Consent Clicked'));

    const dataObjects = await opts.gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 

    /*
    const dataObjects = await opts.gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 
    */
}

module.exports.takeStep = takeStep;