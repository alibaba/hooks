const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
  }
};
