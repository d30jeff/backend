
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  'collectCoverageFrom': [
    '**/*.(t|j)s',
  ],
  'coverageDirectory': './coverage',
  // "Temporary fix" for redis connections not being closed after test suites have completed
  // Spent way too time than needed to debug this
  'forceExit': true,
  'moduleFileExtensions': [
    'js',
    'json',
    'ts',
  ],
  'moduleNameMapper': {
    '^@apps(|/.*)$': '<rootDir>/apps/$1',
    '^@libs(|/.*)$': '<rootDir>/libs/$1',
  },
  // 'modulePathIgnorePatterns': ['<rootDir>/apps/mainstreet-backend/'],
  'rootDir': '.',
  'testEnvironment': 'node',
  'testRegex': '.*\\.(spec|test)\\.ts$',
  'transform': {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
