const { flatten } = require('./flattenwc3');
const { getdatalayer } = require('./getdatalayer');
const { getlocalstorage } = require('./getlocalstorage');
const { getsessionstorage } = require('./getsessionstorage');
const { storeresults } = require('./storeresults');

/* 
optionsObject{
    execute:['getsessionstorage','getlocalstorage','getdatalayer'],
    datadictionary:datadictionaryObject,
    writeTo: 'OUTPUTFOLDER',
    fileName: 'FILENAMEBEGINSWITH'
}
*/

async function getdatatakescreenshot(page,opts){
    //console.log(`opts in gdts: ${JSON.stringify(opts)}`);
    //Get sessionStorage
    const sessionstorage = await getsessionstorage(page);
    //Get localStorage
    const localstorage = await getlocalstorage(page);
    //Get w3c datalayer
    const datalayer = await getdatalayer(page,opts);
    //Flatten w3cDatalayer IMPORTANT - RECURSIVE FUNCTION AND NOT ASYNC
    const flatttenedW3C = await flatten(datalayer,opts.w3cDataLayerName,{});
    //console.log(`flatttenedW3C: ${JSON.stringify(flatttenedW3C)}`);
    //Now test flattenedW3C against imported data-dictionary name,type,patterns
    /*
    const testResultsArray = await Promise.all(flatttenedW3C.map(async (datalayerProperty) => {
        const testResultObject = await testdatalayer(datalayerProperty);
        console.log(JSON.stringify(testResultObject));
        return testResultObject;
    }));
    */
    //await storeresults(testResultsArray);
    return {datalayer:datalayer,localstorage:localstorage,sessionstorage:sessionstorage,flattenedW3C:flatttenedW3C};
}

module.exports.getdatatakescreenshot = getdatatakescreenshot;