# Data Layer Auditor (Puppeteer & Jest)
## Purpose
I've found that folks involved in web (and mobile) analytics implementation still tend to test data layer implementations manually. This usually involves walking through a web journey (often manually), firing up the console and checking the state of a data layer (values assigned to properties). With a simple non-nested data layer with few data points perhaps this approach might suffice, but with complex nested w3c style data layers it is tedious and very error prone. Hence I decided to build this tool using [Puppeteer](https://pptr.dev/) and [Jest](https://jestjs.io/docs/en/puppeteer) to help myself and perhaps others with this task. Of course this can only be bolierplated to a certain degree as web journeys differ greatly. But the architecture attempts to offer flexibility.

## How to Use

You'll first need to `git clone` and then `npm install` to install all the required packages - in particular Puppeteer and Jest (along with their dependencies).

The example setup will navigate to a particular ecommerce site and walk through some example steps while capturing the state of a w3c datalayer throughout the flow. The initial navigation is driven by the definitions in [./targets/targeturls.json](./targets/targeturls.json)

The captured data dictionary which is defined in [./targets/targetdataobjects.json](./targets/targetdataobjects.json) is recursively flattened until it matches the format 'keyNameString': 'somePrimitive'. The values found assigned to the flattened kayNameString properties are then tested against RegExp's defined in a data dictionary xlsx file which is pulled in by the [readspreadsheet.js](./utilities/readspreadsheet.js) function. 

## Data Dictionary
The data dictionary for the example setup looks like the table below (the RegExp's could of course be modified / improved). [Here's the Google Sheet](https://docs.google.com/spreadsheets/d/1ydtE2LGRms56xYIAUfZShmg6gYRMCYBqo5cVsfMYQrI/edit?usp=sharing) that contains this example. To create your own data dictionary you can copy the sheet, use one of these gists ([JS](https://gist.github.com/cssimsek/cd151ba2fa6a9346db7280d731333d28#file-flatten_w3c_datalayer-js) or [Node.js](https://gist.github.com/cssimsek/cd151ba2fa6a9346db7280d731333d28#gistcomment-2951269)) to flatten your nested W3C data layer to match the expected format and define your patterns for the Key and Values. Your data dictionary should then be added to the [./datadictionary](./datadictionary) directory in .xlsx format.

**DataLayer\_Property\_Flat**|**Key\_Pattern**|**Type**|**Value\_Pattern**|**Example\_Value**|**Nullable**|**Description**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
digitalData\_component\_0\_componentInfo\_componentID|digitalData\_component\_\d+\_componentInfo\_componentID$|int|[0-9\\_a-zA-Z]+[a-zA-Z0-9]$|1155033\_R\_Z001A|FALSE| 
digitalData\_component\_0\_componentInfo\_componentType|digitalData\_component\_\d+\_componentInfo\_componentType$|string|[a-zA-Z0-9\\_]+|images|FALSE| 
digitalData\_components\_0\_grouping\_desc|digitalData\_components\_\d+\_grouping\_desc$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|Category Product Grid|FALSE| 
digitalData\_components\_0\_grouping\_type|digitalData\_components\_\d+\_grouping\_type$|string|^GL\d+$|GL0044|FALSE| 
digitalData\_components\_desc|digitalData\_components\_desc$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|Hero with caps subhead|FALSE| 
digitalData\_components\_id|digitalData\_components\_id$|int|\d+|8686691|FALSE| 
digitalData\_components\_type|digitalData\_components\_type$|string|^T\d+$|M0012|FALSE| 
digitalData\_currentTrackValue|digitalData\_currentTrackValue$|string|[a-z\\-]+|ui-cms|FALSE| 
digitalData\_currentTrackValue|digitalData\_currentTrackValue$|string|[a-zA-Z0-9\\_]+|pdp\_recommendationsNewPageViewed|FALSE| 
digitalData\_event\_0\_attributes\_recommendations\_displayedList\_0|digitalData\_event\_\d+\_attributes\_recommendations\_displayedList\_\d+$|int|\d+|7507283|FALSE| 
digitalData\_event\_0\_attributes\_recommendations\_fullList\_0|digitalData\_event\_\d+\_attributes\_recommendations\_fullList\_\d+$|int|\d+|7507283|FALSE| 
digitalData\_event\_0\_attributes\_recommendations\_source|digitalData\_event\_\d+\_attributes\_recommendations\_source$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|monetisation|FALSE| 
digitalData\_event\_0\_attributes\_recommendations\_title|digitalData\_event\_\d+\_attributes\_recommendations\_title$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|Featured products|FALSE| 
digitalData\_event\_0\_eventInfo\_eventAction|digitalData\_event\_\d+\_eventInfo\_eventAction$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|Recommendations New Page Viewed|FALSE| 
digitalData\_event\_0\_eventInfo\_eventName|digitalData\_event\_\d+\_eventInfo\_eventName$|string|[a-zA-Z0-9\\_]+|pdp\_recommendationsNewPageViewed|FALSE| 
digitalData\_event\_0\_eventInfo\_eventRef|digitalData\_event\_\d+\_eventInfo\_eventRef$|string|[a-zA-Z0-9\\_]+|hD7id|FALSE| 
digitalData-event-2-attributes-link|digitalData-event-\d+-attributes-link$|string|^([a-zA-Z\&]\s{0,})+$|Questions & Answers|FALSE| 
digitalData\_experiments\_0\_experimentInfo\_experimentCookie|digitalData\_experiments\_\d+\_experimentInfo\_experimentCookie$|string|[a-zA-Z0-9\\_]+|PDP\_Test\_Group\_1|FALSE| 
digitalData\_experiments\_0\_experimentInfo\_experimentName|digitalData\_experiments\_\d+\_experimentInfo\_experimentName$|string|[a-zA-Z\\-]+|OPT-224|FALSE| 
digitalData\_experiments\_0\_experimentInfo\_experimentVariant|digitalData\_experiments\_\d+\_experimentInfo\_experimentVariant$|.*|.*|null|TRUE| 
digitalData\_page\_attributes\_channel|digitalData\_page\_attributes\_channel$|string|(?:[^:]+:?)+|uk:desktop|FALSE| 
digitalData\_page\_attributes\_numberOfStoresOffered|digitalData\_page\_attributes\_numberOfStoresOffered$|int|\d+|0|FALSE| 
digitalData\_page\_attributes\_numberOfStoresWithInStock|digitalData\_page\_attributes\_numberOfStoresWithInStock$|int|\d+|0|FALSE| 
digitalData\_page\_attributes\_numberOfStoresWithLeadTime|digitalData\_page\_attributes\_numberOfStoresWithLeadTime$|int|\d+|0|FALSE| 
digitalData\_page\_attributes\_numberOfStoresWithOutOfStock|digitalData\_page\_attributes\_numberOfStoresWithOutOfStock$|int|\d+|0|FALSE| 
digitalData\_page\_attributes\_platform|digitalData\_page\_attributes\_platform$|string|^([a-z]+(\\_{0,1}[a-z])+?$)+$|react\_magnolia|FALSE| 
digitalData\_page\_attributes\_platform|digitalData\_page\_attributes\_platform$|string|^([a-z0-9]+\\_?)+|react\_pdp|FALSE| 
digitalData\_page\_attributes\_specialOffersIDs\_0|digitalData\_page\_attributes\_specialOffersIDs\_\d+$|string|^[A-Z]{1}\d+$|E30182|FALSE| 
digitalData\_page\_attributes\_specialOffersNumber|digitalData\_page\_attributes\_specialOffersNumber$|int|\d+|3|FALSE| 
digitalData\_page\_attributes\_specialOffersTypes\_0|digitalData\_page\_attributes\_specialOffersTypes\_\d+$|string|[a-zA-Z]+\b|isBuilderOffer|FALSE| 
digitalData\_page\_attributes\_templateDesc|digitalData\_page\_attributes\_templateDesc$|string|^[A-Z]{1}[a-z]+$|Hybrid|FALSE| 
digitalData\_page\_attributes\_templateId|digitalData\_page\_attributes\_templateId$|string|^T\d+$|T013|FALSE| 
digitalData\_page\_category\_pageType|digitalData\_page\_category\_pageType$|string|^[a-z]+$|events|FALSE| 
digitalData\_page\_category\_pageType|digitalData\_page\_category\_pageType$|string|[a-zA-Z]+\b|pdp|FALSE| 
digitalData\_page\_category\_subCategory3|digitalData\_page\_category\_subCategory\d+$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|SIM free phones|FALSE| 
digitalData\_page\_pageInfo\_categoryID\_0|digitalData\_page\_pageInfo\_categoryID\_\d+$|int|\d+|29949|FALSE| 
digitalData\_page\_pageInfo\_pageName|digitalData\_page\_pageInfo\_pageName$|string|^([a-z0-9\-]+\:)+$|ar:pdp:1155033:simfreegooglepixel3a64gbmobilephone-white:|FALSE| 
digitalData\_page\_pageInfo\_siteSection|digitalData\_page\_pageInfo\_siteSection$|string|^([a-z0-9]+\:)+$|ar:events:|FALSE| 
digitalData\_parallelRun|digitalData\_parallelRun$|boolean|.*|TRUE|FALSE| 
digitalData\_product\_0\_attributes\_alternativesStore|digitalData\_product\_\d+\_attributes\_alternativesStore$|object|.*|null|FALSE| 
digitalData\_product\_0\_attributes\_brandRangeLink|digitalData\_product\_\d+\_attributes\_brandRangeLink$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|Google|FALSE| 
digitalData\_product\_0\_attributes\_cnetContent|digitalData\_product\_\d+\_attributes\_cnetContent$|boolean|.*|TRUE|FALSE| 
digitalData\_product\_0\_attributes\_collectionStockCode|digitalData\_product\_\d+\_attributes\_collectionStockCode$|int|\d+|5|FALSE| 
digitalData\_product\_0\_attributes\_collectionStockLevelMessage|digitalData\_product\_\d+\_attributes\_collectionStockLevelMessage$|object|.*|null|TRUE| 
digitalData\_product\_0\_attributes\_collectionStoreType|digitalData\_product\_\d+\_attributes\_collectionStoreType$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$|regular|FALSE| 
digitalData\_product\_0\_attributes\_existingProductOptions|digitalData\_product\_\d+\_attributes\_existingProductOptions$|object|.*|null|TRUE| 
digitalData\_product\_0\_attributes\_fastTrackBanner|digitalData\_product\_\d+\_attributes\_fastTrackBanner$|string|([^:]+\b)|pdp:banner:fastTrack|FALSE| 
digitalData\_product\_0\_attributes\_fulfillmentMethod|digitalData\_product\_\d+\_attributes\_fulfillmentMethod$|string|[a-z]+(\|[a-z]+)?|collection|delivery|FALSE| 
digitalData\_product\_0\_attributes\_numberOfAnswers|digitalData\_product\_\d+\_attributes\_numberOfAnswers$|int|\d+|3|FALSE| 
digitalData\_product\_0\_attributes\_numberOfQuestions|digitalData\_product\_\d+\_attributes\_numberOfQuestions$|int|\d+|3|FALSE| 
digitalData\_product\_0\_attributes\_numberOfReviews|digitalData\_product\_\d+\_attributes\_numberOfReviews$|int|\d+|5|FALSE| 
digitalData\_product\_0\_attributes\_priceMessage|digitalData\_product\_\d+\_attributes\_priceMessage$|string|^([A-Z]{0,1}[a-z]*\s{0,})+[a-z]$| |TRUE| 
digitalData\_product\_0\_attributes\_promotion|digitalData\_product\_\d+\_attributes\_promotion$|boolean|.*|FALSE|FALSE| 
digitalData\_product\_0\_attributes\_selectedProductOptions|digitalData\_product\_\d+\_attributes\_selectedProductOptions$|object|.*|null|TRUE| 
digitalData\_product\_0\_attributes\_starRating|digitalData\_product\_\d+\_attributes\_starRating$|float|\d+\.\d+|4.8|FALSE| 
digitalData\_product\_0\_attributes\_storeID|digitalData\_product\_\d+\_attributes\_storeID$|object|.*|null|TRUE| 
digitalData\_product\_0\_attributes\_unitPriceWithTax|digitalData\_product\_\d+\_attributes\_unitPriceWithTax$|int|\d+|399|FALSE| 
digitalData\_product\_0\_productInfo\_productID|digitalData\_product\_\d+\_productInfo\_productID$|int|\d+|1155033|FALSE| 
digitalData\_product\_0\_productInfo\_productName|digitalData\_product\_\d+\_productInfo\_productName$|string|^([a-zA-Z0-9]+[\s\-]*)+$|SIM Free Google Pixel 3a 64GB Mobile Phone - White|FALSE| 
digitalData\_trackVersion|digitalData\_trackVersion$|string|^(ut)(\d{12})?|utag.js|FALSE|Possibly should be looking for utag.cfg.v? ut4.45.201906201435
digitalData\_trackVersion|digitalData\_trackVersion$|string|([a-z\.]*)\b|utag.js|FALSE| 
digitalData\_user\_0\_profile\_0\_attributes\_globalView|digitalData\_user\_\d+\_profile\_\d+\_attributes\_globalView$|boolean|.*|TRUE|FALSE| 
digitalData\_user\_0\_profile\_0\_attributes\_loginStatus|digitalData\_user\_\d+\_profile\_\d+\_attributes\_loginStatus$|string|[a-zA-Z\-]+$|Non-Registered|FALSE| 
digitalData\_user\_profile\_attributes\_loginStatus|digitalData\_user\_profile\_attributes\_loginStatus$|string|^[A-Z]{1}[a-z]+$|Registered|FALSE| 
digitalData\_user\_profile\_profileInfo\_profileID|digitalData\_user\_profile\_profileInfo\_profileID$|string|.*|"|TRUE| 