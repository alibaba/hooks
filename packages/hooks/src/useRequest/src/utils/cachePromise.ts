type CachedKey = string | number;
const cachePromise = new Map<CachedKey, Promise<any>>();

const getCachePromise = (cacheKey: CachedKey) => {
  return cachePromise.get(cacheKey);
};

const setCachePromise = (cacheKey: CachedKey, promise: Promise<any>) => {
  // Should cache the same promise, cannot be promise.finally
  // Because the promise.finally will change the reference of the promise
  cachePromise.set(cacheKey, promise);

  // no use promise.finally for compatibility
  promise
    .then((res) => {
      if (cachePromise.get(cacheKey) === promise) {
        cachePromise.delete(cacheKey);
      }
      return res;
    })
    .catch(() => {
      if (cachePromise.get(cacheKey) === promise) {
        cachePromise.delete(cacheKey);
      }
    });
};

export { getCachePromise, setCachePromise };
