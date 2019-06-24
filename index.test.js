//Import target page
const targeturls = require('./targets/targeturls');
//Import target data
const targetdata = require('./targets/targetdataobjects.json');
//Import Steps
const stepCollection = require('./test-steps/step-collection');
//Get data and take screenshots
const gdts = require('./utilities/getdatatakescreenshot');
//Store matching network interceptions
const storenetworkintercept = require('./utilities/storenetworkintercept');
//Get Data Dictionary for comparison
const readSpreadsheet = require('./utilities/readspreadsheet');
//Iterator abstraction for dataDictionaryObject.entries traversal
const iterateDataDictionary = require('./utilities/iterateDataDictionary');

const timeout = 10000;
let incognitoBrowser, page, dataDictionaryObject;
beforeAll(async () => {
  incognitoBrowser = await global.__BROWSER__.createIncognitoBrowserContext();
  page = await incognitoBrowser.newPage();
  await page.setRequestInterception(true);
  console.log(targeturls.networkintercept);
  page.on('request', async request => {
    let reqUrl = request.url();
    if (reqUrl.indexOf(targeturls.networkintercept) != -1) {
      await storenetworkintercept(request);
      request.continue();
    } else {
      request.continue();
    }
  });
  dataDictionaryObject = await readSpreadsheet();
}, timeout);

const stepOpts = {
  targeturls: targeturls,
  gdts: gdts,
  targetdata: targetdata
};

//JEST DESCRIBE TESTS

describe('/ Home Page', () => {

  const that = this;
  let datalayerObject, dataLayerObjectFlat, dataLayerFromPageEntries, dataDictionaryEntries, resultOfStepOne;

  beforeAll(async () => {
    resultOfStepOne = await stepCollection.one.takeStep(page, stepOpts);
    datalayerObject = await resultOfStepOne[0];
    dataLayerObjectFlat = await resultOfStepOne[1];
    dataLayerFromPageEntries = await Object.entries(dataLayerObjectFlat);
    dataDictionaryEntries = await Object.values(dataDictionaryObject);
    const ddPropIterator = await iterateDataDictionary(dataDictionaryEntries);
    const firstMatcher = await ddPropIterator.next().value;
    arrayOfTests = await dataLayerFromPageEntries.map(flatProp => {
      if (new RegExp(firstMatcher['Key_Pattern']).test(flatProp[0])) {
        return [flatProp[1], new RegExp(firstMatcher['Value_Pattern'])];
      }
    })
    global.arrayOfTests = await arrayOfTests.filter(el => !!el);
    //await console.log(arrayOfTests);

  })

  //Iterate through data dictionary, use value 'Key_Pattern' to match now flattened array element keys, and 'Value_Pattern' to match values
  test(`Test Datalayer`, async () => {
    await console.log('In test');
    for await (testable of arrayOfTests) {
      //await console.log(testable[0], testable[1]);
      await expect(testable[0]).toEqual(expect.stringMatching(testable[1]));
    }
  });


});

describe('Click Consent Banner', () => {

  test('Consent Banner Clicked', async () => {
    resultOfStepTwo = await stepCollection.two.takeStep(page, stepOpts);
    return resultOfStepTwo;
  });

});

describe('Add To Basket Flow', () => {

  test('Click Add To Basket', async () => {
    resultOfStepThree = await stepCollection.three.takeStep(page, stepOpts);
    return resultOfStepThree;
  });

  test('Go To Trolley', async () => {
    resultOfStepFour = await stepCollection.four.takeStep(page, stepOpts);
    return resultOfStepFour;
  });

});

describe('Postcode and Collect Flow', () => {

  test('Enter Postcode and Click Collection', async () => {
    resultOfStepFive = await stepCollection.five.takeStep(page, stepOpts);
    return resultOfStepFive;
  });

});

describe('Continue To Payment Flow', () => {

  test('Click Continue to Pay and Collect', async () => {
    resultOfStepSix = await stepCollection.six.takeStep(page, stepOpts);
    return resultOfStepSix;
  });

});