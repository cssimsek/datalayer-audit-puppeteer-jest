async function getlocalstorage(page) {
    const aHandle = await page.evaluateHandle(() => window);
    const resultHandle = await page.evaluateHandle(window => JSON.stringify(window.localStorage), aHandle);
    const localStorage = await resultHandle.jsonValue();
    //console.log(`localStorage: ${localStorage}`);
    await resultHandle.dispose();
    return localStorage;
}
module.exports.getlocalstorage = getlocalstorage;