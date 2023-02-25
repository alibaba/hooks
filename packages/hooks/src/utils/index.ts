/**
 * @see https://github.com/facebook/react/blob/main/packages/shared/ReactSymbols.js#L15
 */
const REACT_ELEMENT_TYPE = Symbol.for('react.element');

export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object';
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isString = (value: unknown): value is string => typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';

/**
 * Verifies the object is a ReactElement.
 * @see https://reactjs.org/docs/react-api.html#isvalidelement
 * @see https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElementValidator.js#L66
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 */
export function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
