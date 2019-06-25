# datalayer-audit-puppeteer-jest
# Purpose
I've found that folks involved in web (and mobile) analytics implementation still tend to test data layer implementations manually. This usually involves walking through a web journey (often manually), firing up the console and checking the state of a data layer (values assigned to properties). With a simple non-nested data layer with few data points perhaps this approach might suffice, but with complex nested w3c style data layers it is tedious and very error prone. 

Hence I decided to build this tool using [Puppeteer](https://pptr.dev/) and [Jest](https://jestjs.io/docs/en/puppeteer) to help myself and perhaps others with this task. Of course this can only be bolierplated to a certain degree as web journeys differ greatly. But the architecture attempts to offer flexibility.

