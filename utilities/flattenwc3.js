async function flattenW3C(object, keyTree, targetObject){
    async function flatten(object, keyTree, targetObject) {
        keyTree = keyTree || 'digitalData';
        if (!!object && /(Array|Object)/g.test(object.constructor.toString())) {
            if (Array.isArray(object)) {
                for (var i = 0; i < object.length; i += 1) {
                    await flatten(object[i], keyTree.concat('_' + i),targetObject);
                }
            } else {
                for (var prop in object) {
                    if (object.hasOwnProperty(prop)) {
                        await flatten(object[prop], keyTree.concat('_' + prop),targetObject);
                    }
                }
            }
        } else {
            targetObject[keyTree] = object;
        }
    }
    await flatten(object, keyTree, targetObject);
    return targetObject;
}

module.exports.flatten = flattenW3C;