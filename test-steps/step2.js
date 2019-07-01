const sdj = require('../utilities/stepdatajob');

async function takeStep(page, opts) {

    await page.waitFor('.privacy-prompt-footer>a');


    page.on('dialog', async dialog => {
        await console.log(dialog.message());
        await page.waitFor(2000);
        await dialog.dismiss();
    });

    //Click Cookie Consent Banner
    await page.evaluate(() => {
        return Promise.resolve(document.querySelector('.privacy-prompt-footer>a').click());
    });

    await page.evaluate(() => alert('Cookie Consent Clicked'));

    return await sdj(page, opts);

}

module.exports.takeStep = takeStep;