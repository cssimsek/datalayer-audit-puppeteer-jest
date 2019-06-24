const fs = require('fs');

//Initial stub
async function storeresults(resultData,opts){
    fs.appendFileSync(opts.targetFile,resultData);
}

module.exports = storeresults;