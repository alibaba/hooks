export const isObject = (value: unknown): value is Record<string | number | symbol, any> =>
  value !== null && typeof value === 'object';
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isIterable = (value: unknown): value is Iterable<any> =>
  !isUndef(value) &&
  value !== null &&
  (isFunction(Object(value)[Symbol.iterator]) || isFunction(Object(value)[Symbol.asyncIterator]));

export const isString = (value: unknown): value is string => typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';
