const sdj = require('../utilities/stepdatajob');

async function takeStep(page,opts) {

    await page.waitFor(2000);

    await page.waitFor('.xs-12.sm-6--none.xs-order-1.sm-order-2>a');

    //Click Go To Trolley
    await page.evaluate(()=> {
        return Promise.resolve(document.querySelectorAll('.xs-12.sm-6--none.xs-order-1.sm-order-2>a')[0].click());
    });

    await page.waitForNavigation('domcontentloaded');

    return await sdj(page, opts);
    
}

module.exports.takeStep = takeStep;