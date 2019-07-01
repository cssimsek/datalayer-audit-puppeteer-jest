const gdts = require('./getdatatakescreenshot');

async function stepdatajob(page,opts){
    const dataObjects = await gdts.getdatatakescreenshot(page,opts.targetdata);
    return [dataObjects.datalayer,dataObjects.flattenedW3C]; 
}

module.exports = stepdatajob;