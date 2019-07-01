const sdj = require('../utilities/stepdatajob');

async function takeStep(page, opts) {

    await page.waitFor(2000);

    await page.waitFor('.button--full');

    //Click Add To Basket
    await page.evaluate(() => {
        return Promise.resolve(document.querySelector('.button--full').click());
    });

    return await sdj(page, opts);
    
}

module.exports.takeStep = takeStep;