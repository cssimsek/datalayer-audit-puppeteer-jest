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
//Utility function that encapsulates data layer processing steps
const processCapturedDataLayer = require('./utilities/processcaptureddatalayer');

const timeout = 10000;
let incognitoBrowser, page, dataDictionaryObject;
beforeAll(async () => {
  incognitoBrowser = await global.__BROWSER__.createIncognitoBrowserContext();
  page = await incognitoBrowser.newPage();
  await page.setRequestInterception(true);
  console.log(targeturls.networkintercept);
  page.on('request', async request => {
    let reqUrl = await request.url();
    if (reqUrl.indexOf(targeturls.networkintercept) != -1) {
      await storenetworkintercept(request);
      await request.continue();
    } else {
      await request.continue();
    }
  });
  //dataDictionaryObject = await readSpreadsheet();
}, timeout);

const stepOpts = {
  targeturls: targeturls,
  gdts: gdts,
  targetdata: targetdata
};

//JEST DESCRIBE TESTS

describe('/ Home Page', () => {

  beforeAll(async () => {});
  
  test(`Test Datalayer`, async () => {
    const resultOfStepOne = await stepCollection.one.takeStep(page, stepOpts);
    const arrayOfDataTests = await processCapturedDataLayer(resultOfStepOne);
    //Iterate through data dictionary, use value 'Key_Pattern' to match now flattened array element keys, and 'Value_Pattern' to match values
    for await (testable of arrayOfDataTests) {
      //await console.log(testable[0], testable[1]);
      await expect(testable[0]).toEqual(expect.stringMatching(testable[1]));
    }
  });


});

describe('Click Consent Banner', () => {

  beforeAll(async () => {});

  test('Consent Banner Clicked', async () => {
    resultOfStepTwo = await stepCollection.two.takeStep(page, stepOpts);
    return resultOfStepTwo;
  });

});

describe('Add To Basket Flow', () => {

  beforeAll(async () => {});

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

  beforeAll(async () => {});

  test('Enter Postcode and Click Collection', async () => {
    resultOfStepFive = await stepCollection.five.takeStep(page, stepOpts);
    return resultOfStepFive;
  });

});

describe('Continue To Payment Flow', () => {

  beforeAll(async () => {});

  test('Click Continue to Pay and Collect', async () => {
    resultOfStepSix = await stepCollection.six.takeStep(page, stepOpts);
    return resultOfStepSix;
  });

});