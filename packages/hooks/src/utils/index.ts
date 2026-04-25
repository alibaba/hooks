export const isObject = (val: unknown): val is Record<PropertyKey, any> => {
  return val !== null && typeof val === 'object';
};

export const isFunction = (val: unknown): val is (...args: any[]) => any => {
  return typeof val === 'function';
};

export const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === 'boolean';
};

export const isNumber = (val: unknown): val is number => {
  return typeof val === 'number' && !Number.isNaN(val);
};

export const isUndef = (val: unknown): val is undefined => {
  return typeof val === 'undefined';
};

export const isNonNullable = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

export const isThenable = <T>(val: any): val is PromiseLike<T> => {
  return isNonNullable(val) && isFunction(val.then);
};
