type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;

export interface CachedData<TData = any, TParams = any> {
  data: TData;
  params: TParams;
  time: number;
}
interface RecordData extends CachedData {
  timer: Timer | undefined;
}

const cache = new Map<CachedKey, RecordData>();

const clearTimer = (cachedData?: RecordData) => {
  if (cachedData?.timer) {
    clearTimeout(cachedData.timer)
  }
}

const setCache = (key: CachedKey, cacheTime: number, cachedData: CachedData) => {
  const currentCache = cache.get(key);
  clearTimer(currentCache);

  let timer: Timer | undefined = undefined;

  if (cacheTime > -1) {
    // if cache out, clear it
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }

  cache.set(key, {
    ...cachedData,
    timer,
  });
};

const getCache = (key: CachedKey) => {
  return cache.get(key);
};

const clearCache = (key?: string | string[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((cacheKey) => {
      const currentCache = cache.get(cacheKey);
      clearTimer(currentCache);
      cache.delete(cacheKey);
    });
  } else {
    for (const currentCache of cache.values()) {
      clearTimer(currentCache);
    }
    cache.clear();
  }
};

export { getCache, setCache, clearCache };
