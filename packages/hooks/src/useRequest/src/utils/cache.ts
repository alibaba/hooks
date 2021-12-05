type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;
type CachedData = { data: any; params: any; timer: Timer | undefined; time: number };

type Listener = (data: any) => void;

const cache = new Map<CachedKey, CachedData>();

const listeners: Record<string, Listener[]> = {};

const setCache = (key: CachedKey, cacheTime: number, data: any, params: any) => {
  const currentCache = cache.get(key);
  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer: Timer | undefined = undefined;

  if (cacheTime > -1) {
    // if cache out, clear it
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }

  // trigger listeners
  if (listeners[key]) {
    listeners[key].forEach((item) => item(data));
  }

  cache.set(key, {
    data,
    params,
    timer,
    time: new Date().getTime(),
  });
};

const getCache = (key: CachedKey) => {
  return cache.get(key);
};

const subscribe = (key: string, listener: Listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);

  return function unsubscribe() {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
};

const clearCache = (key?: string | string[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((cacheKey) => cache.delete(cacheKey));
  } else {
    cache.clear();
  }
};

export { getCache, setCache, subscribe, clearCache };
