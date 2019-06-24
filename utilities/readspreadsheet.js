const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const ddpath = require('../targets/targetdataobjects.json');

readSpreadsheet();

async function readSpreadsheet(targetFile) {
    //console.log(dataSpecFile);
    const targetWorkbook = await XLSX.readFile(path.resolve(ddpath.dataDictionaryPath));
    //console.log(targetWorkbook);
    const sheetNameList = targetWorkbook.SheetNames;
    console.log(sheetNameList);
    return XLSX.utils.sheet_to_json(targetWorkbook.Sheets[sheetNameList[0]]);
}

module.exports = readSpreadsheet;