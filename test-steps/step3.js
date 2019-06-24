const gdts = require('../utilities/getdatatakescreenshot');

async function takeStep(page,opts) {

    await page.waitFor(2000);

    await page.waitFor('.button--full');

    //Click Add To Basket
    const addToBasketClicked = await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('.button--full').click());
    }); 

    return addToBasketClicked;

    /*
    const dataObjects = await opts.gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 
    */
}

module.exports.takeStep = takeStep;