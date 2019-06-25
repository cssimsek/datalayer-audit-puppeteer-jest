//Browser creation with opts
const createBrowser = require('./utilities/createbrowser');
//Import target page
const targeturls = require('./targets/targeturls');
//Import target data
const targetdata = require('./targets/targetdataobjects.json');
//Import Steps
const stepCollection = require('./test-steps/step-collection');
//Get data and take screenshots
const gdts = require('./utilities/getdatatakescreenshot');
//Utility function that encapsulates data layer processing steps
const processCapturedDataLayer = require('./utilities/processcaptureddatalayer');
//Utility to set network interception rules
const setNetworkInterception = require('./utilities/setnetworkinterception');


const timeout = 10000;
let browser, page;
beforeAll(async () => {
  //Create browser and page
  browser = await createBrowser({incognito:true});
  page = await browser.newPage();
  //Set network interception
  await setNetworkInterception(page);
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