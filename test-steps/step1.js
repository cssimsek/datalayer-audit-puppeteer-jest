const sdj = require('../utilities/stepdatajob');

async function takeStep(page, opts) {
    await page.goto(opts.targeturls.main);
    return await sdj(page,opts);
}

module.exports.takeStep = takeStep;