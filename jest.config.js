module.exports = {
    globalSetup: './jestbootstrap/setup.js',
    globalTeardown: './jestbootstrap/teardown.js',
    testEnvironment: './jestbootstrap/puppeteer_environment.js',
    setupFilesAfterEnv: ['./jest.setup.js'],
    verbose: true
};