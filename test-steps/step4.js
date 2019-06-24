const gdts = require('../utilities/getdatatakescreenshot');

async function takeStep(page,opts) {

    await page.waitFor(2000);

    await page.waitFor('.button.button--full.xs-hidden.sm-block');

    //Click Go To Trolley
    const goToTrolleyClicked = await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('.button.button--full.xs-hidden.sm-block').click());
    });

    await page.waitForNavigation('domcontentloaded');

    return goToTrolleyClicked;

    /*
    const dataObjects = await opts.gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 
    */
}

module.exports.takeStep = takeStep;