const fs = require('fs');
const path = require('path');

module.exports = class FilesInDirectory {

    constructor(directory){
        this.fid = fs.readdirSync(path.resolve(directory));
        console.log(this.fid);
        this.requiredTests = (this.fid.map((fileId)=>{
            let resolvedPath = path.resolve(directory,fileId);
            console.log(resolvedPath);
            if(fileId.indexOf('collection')==-1){
                return require(resolvedPath);
            }
        })).filter(test=>!!test);
    }

    printRetrievedFiles(){
        console.log(this.requiredTests);
    }

    nextTestGenerator(){

        const parent = this;
        const fidLength = parent.requiredTests.length;

        function* iterate(index) {
            while (index < fidLength) {
                yield parent.requiredTests[index++];
            }
        }
        return iterate(0);
    }


}
