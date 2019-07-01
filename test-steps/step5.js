const sdj = require('../utilities/stepdatajob');
const formFieldVals = require('../form-dummy-values/formvals.json');

async function takeStep(page,opts) {

    await page.waitFor(2000);

    //Initial Postcode field. We don't fill this
    await page.waitFor('input#basket-FulfilmentSelectorForm');

    const postCodeField = 'input.ac-search-bar__input.form-control';
    await console.log(formFieldVals.step5[postCodeField]);

    //Click Collection
    await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('button#basket-FulfilmentSelectorForm-collectButton').click());
    });

    await page.waitFor('input.ac-search-bar__input.form-control');
    
    await page.type('input.ac-search-bar__input.form-control', formFieldVals.step5[postCodeField], {delay: 100});

    //Click Find
    await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('button.ac-search-bar__button.ac-search-bar__button--inverse.button--secondary').click());
    });

    //Wait for address list
    await page.waitFor('div.sm-4.sm-4--none>button');

    //Select First Match in Store list
    await page.evaluate(()=> {
        return Promise.resolve(document.querySelector('div.sm-4.sm-4--none>button').click());
    });
    
    return await sdj(page, opts);

}

module.exports.takeStep = takeStep;

