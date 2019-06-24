const gdts = require('../utilities/getdatatakescreenshot');

async function takeStep(page,opts) {

    await page.waitFor('button.FulfilmentConfirmationForm__submitFormButton__VuSWy');

    //Click Continue
    const clickContinue = await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('button.FulfilmentConfirmationForm__submitFormButton__VuSWy').click());
    });
    

    await page.waitForNavigation('domcontentloaded');

    return clickContinue;

    /*
    const dataObjects = await opts.gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 
    */
}

module.exports.takeStep = takeStep;