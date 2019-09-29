const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
  }
};
