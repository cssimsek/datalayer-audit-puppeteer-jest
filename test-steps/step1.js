async function takeStep(page, opts) {
    await page.goto(opts.targeturls.main);
    const dataObjects = await opts.gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 
}

module.exports.takeStep = takeStep;