module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  clearMocks: true,
  testPathIgnorePatterns: ['/.history/'],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  resetMocks: false,
  setupFiles: ['./jest.setup.js', 'jest-localstorage-mock'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/demo/**',
    '!**/example/**',
    '!**/es/**',
    '!**/lib/**',
    '!**/dist/**',
  ],
  transformIgnorePatterns: ['^.+\\.js$'],
  moduleNameMapper: {
    'lodash-es': 'lodash',
  },
};
