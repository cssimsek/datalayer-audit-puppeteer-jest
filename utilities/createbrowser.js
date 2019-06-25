async function createbrowser(opts){
  return (opts.incognito ? await global.__BROWSER__.createIncognitoBrowserContext() : await global.__BROWSER__);
}
module.exports = createbrowser;