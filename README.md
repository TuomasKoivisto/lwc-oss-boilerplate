# lwc-oss-boilerplate

Salesforce developer experience outside of Salesforce. LWC OSS (https://lwc.dev/) project with Lightning base components, Lightning design system and Jest.

## Motivation

If you're a Salesforce developer familiar with Salesforce Lightning Web Components (https://developer.salesforce.com/docs/component-library/documentation/en/lwc), you also might want to use your skills outside Salesforce to build frontend applications. It's possible with Lightning web components open source, but create-lwc-app doesn't provide lightning base components and Lightning Design system out of the box. This project shows how it's done.



## Steps 

I've combined two https://salesforce.stackexchange.com/ answers:
1. https://salesforce.stackexchange.com/questions/323613/lightning-open-source-use-of-base-components by **Mohith Shrivastava**
2. https://salesforce.stackexchange.com/questions/348971/lwc-oss-lightning-base-components-jest-tests by **Dave C** 

Thank you guys!

Commits in order:

- Initialize project with create-lwc-app
    - Simply run `npx create-lwc-app my-app` as instructed in the LWC OSS documentation
- Add lightning base components:
    - Run `npm install lightning-base-components`
    - Ensure that your lwc.config.json has the npm dependency specified: 
    
    ```
    {
        "modules": [
            {
                "dir": "src/modules"
            },
            { 
                "npm": "lightning-base-components" 
            }
        ]
    }
    ```
    - Run `npm install @salesforce-ux/design-system --save-dev`
    - Make sure you have lwc-services.config.js properly configured:
    ```
    module.exports = {
        resources: [
            {
                from: 'src/resources/',
                to: 'dist/resources/'
            },
            {
                from: 'node_modules/@salesforce-ux/design-system/assets',
                to: 'src/SLDS'
            },
            {
                from: 'node_modules/@salesforce-ux/design-system/assets',
                to: 'dist/SLDS'
            }
        ]
    };
    ```
    - Add the SLDS styles in your index.html at the head:
    ```
    <link
        rel="stylesheet"
        href="/SLDS/styles/salesforce-lightning-design-system.min.css"
    />
    ```
    - Make sure you have `import "@lwc/synthetic-shadow"` in your index.js. Ensure the import is the first statement in your index.js file, else the synthetic shadow may not work
- Make jest tests run with lightning base components:
    - update the jest.config.js with the following: 
    ```
    module.exports = {
        ...jestConfig,
        // Add your custom Jest configuration

        // run jest with lightning base components https://salesforce.stackexchange.com/questions/348971/lwc-oss-lightning-base-components-jest-tests
        transformIgnorePatterns: ['/node_modules/(?!lightning-base-components)'],
        moduleNameMapper: {
            "lightning/(.*)": [
                "<rootDir>/node_modules/lightning-base-components/src/lightning/$1/$1.js"
            ]
        },
    };
    ```

## The Result

You can now use:
- Lightning Web Components open source (https://lwc.dev/)
- Lightning base components (https://www.npmjs.com/package/lightning-base-components)
- Lightning Design System: (https://www.lightningdesignsystem.com/)
- Jest for unit testing (https://lwc.dev/guide/test)