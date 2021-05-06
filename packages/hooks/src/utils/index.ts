export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export const isBrowser = typeof window !== 'undefined';
