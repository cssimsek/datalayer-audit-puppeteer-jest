const sdj = require('../utilities/stepdatajob');

async function takeStep(page,opts) {

    await page.waitFor('button.FulfilmentConfirmationForm__submitFormButton__VuSWy');

    //Click Continue
    await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('button.FulfilmentConfirmationForm__submitFormButton__VuSWy').click());
    });
    

    await page.waitForNavigation('domcontentloaded');

    return await sdj(page, opts);
}

module.exports.takeStep = takeStep;