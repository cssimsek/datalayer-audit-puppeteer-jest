async function isnullval(val){
    switch(val){
        case null:
        case undefined:
        case '':
            return true;
    }
    return false;
}

module.exports = isnullval; 