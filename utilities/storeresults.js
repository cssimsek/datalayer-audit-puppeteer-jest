const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const readDirAwait = promisify(fs.readdir);
const mkDirAwait = promisify(fs.mkdir);

const storageLocation = require('../targets/resultstoragelocation.json');

module.exports = class ResultStorage {

    constructor() {
        this.init();
    }

    async init(){
        let latestTestDirectory;
        //find or create test directory
        const mainPath = await path.resolve(storageLocation.directory);
        const testResultsDirectoryItems = await readDirAwait(mainPath, {
            withFileTypes: true
        });
        const testDirs = testResultsDirectoryItems.filter(item => item.isDirectory());
        if (!testDirs.length) {
            latestTestDirectory = `test0`;
            await mkDirAwait(path.join(mainPath,latestTestDirectory));
        } else {
            testDirs.sort((a, b) => {
                return parseInt(b.name.match(/\d+$/)[0],10) - parseInt(a.name.match(/\d+$/)[0],10);
            })
            let prevTestDirectory = testDirs[0].name;
            latestTestDirectory = `test${parseInt(prevTestDirectory.match(/\d+$/)[0],10)+1}`;
            await mkDirAwait(path.join(mainPath,latestTestDirectory));
        }

        this.latestTestDirectory = await path.join(mainPath,latestTestDirectory);
    
    }

    getLatestStorageDirectory(){
        return this.latestTestDirectory;
    }

    //Stub
    createTestStepDirectory(){

    }

    //Stub
    writeFile(){

    }

    //Stub
    takeScreenShot(){

    }
}