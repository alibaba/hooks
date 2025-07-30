/** esm modules to transform */
const esmModules = [
  // `query-string` and its related dependencies
  'query-string',
  'decode-uri-component',
  'split-on-first',
  'filter-obj',
];

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  clearMocks: true,
  testMatch: [
    // Only match test files in specific locations, excluding packages/hooks/src
    '<rootDir>/packages/!(hooks)/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/!(hooks)/src/**/__test__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/!(hooks)/**/*.{test,spec}.{js,jsx,ts,tsx}',
    // Exclude any test files in packages/hooks/src since they use Vitest
  ],
  testPathIgnorePatterns: [
    '/.history/',
    '<rootDir>/packages/use-url-state/',
    '<rootDir>/packages/hooks/es/',
    '<rootDir>/packages/hooks/lib/',
    '<rootDir>/packages/hooks/dist/',
    '<rootDir>/packages/hooks/src/', // Completely ignore packages/hooks/src
  ],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  resetMocks: false,
  setupFiles: ['./jest.setup.js', 'jest-localstorage-mock', './match-media-mock.js'],
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
    '!**/packages/hooks/src/**/__tests__/**',
  ],
  transformIgnorePatterns: [`node_modules/(?!(?:.pnpm/)?(${esmModules.join('|')}))`],
};
