export function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}
