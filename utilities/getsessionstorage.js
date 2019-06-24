async function getsessionstorage(page) {
    const aHandle = await page.evaluateHandle(() => window);
    const resultHandle = await page.evaluateHandle(window => JSON.stringify(window.sessionStorage), aHandle);
    const sessionStorage = await resultHandle.jsonValue();
    //console.log(`sessionStorage: ${sessionStorage}`);
    await resultHandle.dispose();
    return sessionStorage;
}
module.exports.getsessionstorage = getsessionstorage;