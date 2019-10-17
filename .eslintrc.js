const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
  }
};
