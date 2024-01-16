const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    'import/no-useless-path-segments': 'off',
    'no-unused-expressions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-await-in-loop': 'off',
    'no-constant-condition': ['warn', { checkLoops: false }],
  },
  plugins: [...fabric.default.plugins, 'react-hooks'],
  parserOptions: {
    ...fabric.default.parserOptions,
    project: './packages/**/tsconfig.json',
  },
};
