module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  testPathIgnorePatterns: ['/.history/'],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
