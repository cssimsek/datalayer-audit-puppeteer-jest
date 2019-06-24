async function iterateDataDictionary(dataDictionaryEntries) {

    const ddLength = dataDictionaryEntries.length;

    function* nextDataProp(index) {
        while (index < ddLength) {
            yield dataDictionaryEntries[index++];
        }
    }
    return nextDataProp(0);
}

module.exports = iterateDataDictionary;