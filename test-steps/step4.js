const sdj = require('../utilities/stepdatajob');

async function takeStep(page,opts) {

    await page.waitFor(2000);

    await page.waitFor('.button.button--full.xs-hidden.sm-block');

    //Click Go To Trolley
    await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('.button.button--full.xs-hidden.sm-block').click());
    });

    await page.waitForNavigation('domcontentloaded');

    return await sdj(page, opts);
    
}

module.exports.takeStep = takeStep;