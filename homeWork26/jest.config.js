module.exports = {
  verbose: true,
  clearMocks: true,
  runner: 'jest-runner',
  testTimeout: 70000,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['./setupJest.js'],
  reporters: ['default'],

};
