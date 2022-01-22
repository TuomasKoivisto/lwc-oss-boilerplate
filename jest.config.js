// You only need this file
// - if you want to customize your Jest environment
// - if you want to use Jest i. e. from a Visual Studio Code extension
const { jestConfig } = require('lwc-services/lib/config/jestConfig');

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
