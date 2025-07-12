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
  testPathIgnorePatterns: ['/.history/', '<rootDir>/packages/use-url-state/'],
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
  ],
  transformIgnorePatterns: [`node_modules/(?!(?:.pnpm/)?(${esmModules.join('|')}))`],
};
