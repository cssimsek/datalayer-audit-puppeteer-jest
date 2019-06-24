async function getdatalayer(page,targetData) {
    const aHandle = await page.evaluateHandle(() => window);
    //console.log(targetData);
    const resultHandle = await page.evaluateHandle((w,dl) => w[dl], aHandle,targetData.w3cDataLayerName);
    const digitalData = await resultHandle.jsonValue();
    //console.log(digitalData);
    await resultHandle.dispose();
    return digitalData;
}
module.exports.getdatalayer = getdatalayer;