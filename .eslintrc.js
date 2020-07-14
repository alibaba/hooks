const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    'consistent-return': 'off',
  },
  plugins: [...fabric.default.plugins, 'react-hooks'],
  rules: {
    ...fabric.default.rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parserOptions: {
    ...fabric.default.parserOptions,
    project: './packages/**/tsconfig.json',
  }
};
