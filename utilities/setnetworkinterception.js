//Store matching network interceptions
const storenetworkintercept = require('./storenetworkintercept');
//Import target page
const targeturls = require('../targets/targeturls.json');

async function setnetworkinterception(page) {
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
}

module.exports = setnetworkinterception;