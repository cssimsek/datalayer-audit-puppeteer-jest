//Browser creation with opts
const createBrowser = require('./utilities/createbrowser');
//Import target page
const targeturls = require('./targets/targeturls');
//Import target data
const targetdata = require('./targets/targetdataobjects.json');
//Import Steps
//const stepCollection = require('./test-steps/step-collection');
//More flexible approach to steps collection
const FilesInDirectory = require('./utilities/getfilesindirectory');
//Get data and take screenshots
const gdts = require('./utilities/getdatatakescreenshot');
//Utility function that encapsulates data layer processing steps
const processCapturedDataLayer = require('./utilities/processcaptureddatalayer');
//Utility to set network interception rules
const setNetworkInterception = require('./utilities/setnetworkinterception');
//Allow for null if defined so in datadictionary
const isNullValue = require('./utilities/nullvalchecker');

//Create Test Steps Generator
const StepsCollection = new FilesInDirectory('./test-steps');
const StepsGenerator = StepsCollection.nextTestGenerator();


const timeout = 10000;
let browser, page;
beforeAll(async () => {
  //Create browser and page
  browser = await createBrowser({
    incognito: true
  });
  page = await browser.newPage();
  //Set network interception
  await setNetworkInterception(page);
}, timeout);

const stepOpts = {
  targeturls: targeturls,
  gdts: gdts,
  targetdata: targetdata
};

//Extend EXPECT with toMatchDataDictRegex

expect.extend({
  toMatchDataDictRegex(value, dlMatchArray) {
    let pass = dlMatchArray[1].test(value);
    pass = pass || dlMatchArray[3] && isNullValue(value);
    if (pass) {
      return {
        message: () =>
          `expected ${value} to NOT test true for ${dlMatchArray[1]} of keyPattern ${dlMatchArray[2]}${dlMatchArray[3]?'. Or be a nullable value':''}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${value} to test true for ${dlMatchArray[1]} of keyPattern ${dlMatchArray[2]}${dlMatchArray[3]?'. Or field is nullable':''}`,
        pass: false,
      };
    }
  },
});

//Describe JESTs

describe('/ Home Page', () => {

  beforeAll(async () => {});

  test(`Test Datalayer`, async () => {
    const resultOfStepOne = await StepsGenerator.next().value.takeStep(page, stepOpts);
    const arrayOfDataTests = await processCapturedDataLayer(resultOfStepOne);
    //Iterate through data dictionary, use value 'Key_Pattern' to match now flattened array element keys, and 'Value_Pattern' to match values
    for await (testable of arrayOfDataTests) {
      console.log(testable[0], testable[1]);
      //expect(testable[0]).toEqual(expect.stringMatching(testable[1]));
      expect(testable[0]).toMatchDataDictRegex(testable);
    }
  });

});

describe('Click Consent Banner', () => {

  beforeAll(async () => {});

  test('Consent Banner Clicked', async () => {
    const resultOfStepTwo = await StepsGenerator.next().value.takeStep(page, stepOpts);
    const arrayOfDataTests = await processCapturedDataLayer(resultOfStepTwo);
    //Iterate through data dictionary, use value 'Key_Pattern' to match now flattened array element keys, and 'Value_Pattern' to match values
    for await (testable of arrayOfDataTests) {
      console.log(testable[0], testable[1]);
      //expect(testable[0]).toEqual(expect.stringMatching(testable[1]));
      expect(testable[0]).toMatchDataDictRegex(testable);
    }
  });

});

describe('Add To Basket Flow', () => {

  beforeAll(async () => {});

  test('Click Add To Basket', async () => {
    const resultOfStepThree = await StepsGenerator.next().value.takeStep(page, stepOpts);
    return resultOfStepThree;
  });

  test('Go To Trolley', async () => {
    const resultOfStepFour = await StepsGenerator.next().value.takeStep(page, stepOpts);
    return resultOfStepFour;
  });

});

describe('Postcode and Collect Flow', () => {

  beforeAll(async () => {});

  test('Enter Postcode and Click Collection', async () => {
    const resultOfStepFive = await StepsGenerator.next().value.takeStep(page, stepOpts);
    return resultOfStepFive;
  });

});

describe('Continue To Payment Flow', () => {

  beforeAll(async () => {});

  test('Click Continue to Pay and Collect', async () => {
    const resultOfStepSix = await StepsGenerator.next().value.takeStep(page, stepOpts);
    return resultOfStepSix;
  });

});