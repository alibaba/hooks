export function devCheckDecorator(fn: Function) {
  return function () {
    if (process.env.NODE_ENV === 'development') {
      if (typeof arguments[0] !== 'function') {
        console.error(`${fn.name} expected parameter is a function, got '${typeof fn}`);
      }
    }
    return fn.apply(this, arguments);
  };
}
