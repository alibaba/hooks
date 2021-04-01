export default function limit(fn: any, timespan: number) {
  let pending = false;
  return (...args: any[]) => {
    if (pending) return;
    pending = true;
    setTimeout(() => {
      fn(...args);
      pending = false;
    }, timespan);
  };
}
