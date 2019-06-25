//Get Data Dictionary for comparison
const readSpreadsheet = require('./readspreadsheet');
//Iterator abstraction for dataDictionaryObject.entries traversal
const iterateDataDictionary = require('./iterateDataDictionary');

async function processcaptureddatalayer(responseBodyFromTestStep){
    dataDictionaryObject = await readSpreadsheet();
    datalayerObject = await responseBodyFromTestStep[0];
    dataLayerObjectFlat = await responseBodyFromTestStep[1];
    dataLayerFromPageEntries = await Object.entries(dataLayerObjectFlat);
    dataDictionaryEntries = await Object.values(dataDictionaryObject);
    const ddPropIterator = await iterateDataDictionary(dataDictionaryEntries);
    const firstMatcher = await ddPropIterator.next().value;
    arrayOfTests = await dataLayerFromPageEntries.map(flatProp => {
      if (new RegExp(firstMatcher['Key_Pattern']).test(flatProp[0])) {
        return [flatProp[1], new RegExp(firstMatcher['Value_Pattern'])];
      }
    })
    return await arrayOfTests.filter(el => !!el);
}

module.exports = processcaptureddatalayer;