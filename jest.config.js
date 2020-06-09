module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
