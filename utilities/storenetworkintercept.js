const URL = require('url');

async function storenetworkintercept(req){
    await console.log('Request Method:' + req.method());
    const reqUrl = req.url();
    const parsedReqUrl = URL.parse(reqUrl,true);
    await console.log('parsedReqUrl.query: ' + JSON.stringify(parsedReqUrl.query));
}

module.exports = storenetworkintercept;
