// my-custom-reporter.js
class MyCustomReporter {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
    
    
    onTestResult(contexts, results){
        console.log(results);
    }

    onRunComplete(contexts, results) {
      console.log('Custom reporter output:');
      console.log('GlobalConfig: ', this._globalConfig);
      console.log('Options: ', this._options);
    }
  }
  
  module.exports = MyCustomReporter;