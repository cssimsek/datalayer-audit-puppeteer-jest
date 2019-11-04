const sdj = require('../utilities/stepdatajob');

async function takeStep(page, opts) {

    await page.waitFor(2000);

    //await page.waitFor('.button--full');

    //Click Add To Basket
    await page.evaluate(() => {
        return Promise.resolve(document.querySelectorAll('.xs-row.add-to-trolley-main.top-border button')[0].click());
    });

    return await sdj(page, opts);
    
}

module.exports.takeStep = takeStep;