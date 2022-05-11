export const isArray = (value: unknown): value is any[] => {
  if (Array.isArray) {
    return Array.isArray(value);
  }

  return toString.call(value) === '[object Array]';
};
export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object';
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isString = (value: unknown): value is string => typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';
export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined';
