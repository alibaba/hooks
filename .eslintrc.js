const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric,
  rules: {
    ...fabric.rules,
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
  }
};
