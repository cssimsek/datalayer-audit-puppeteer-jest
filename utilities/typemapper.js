async function mapObjectValTypes(object){
    let result = Object.values(object).map(function(val){
        if(!isNaN(parseFloat(val,10))){
        if(val.indexOf('.')!=-1)return 'float';
        return 'int';
        }
        return typeof val;
    });
    return result;
}

