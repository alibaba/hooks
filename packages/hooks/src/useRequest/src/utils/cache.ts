type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;
type CachedData = { data?: any; params?: any; timer?: Timer | undefined; time: number; customCacheRef?: any };

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


const setCustomCache = (key: CachedKey, data: any, params: any, customCacheRef: any) => {
    customCacheRef?.current?.setCache(key, data, params);
    cache.set(key, {
        customCacheRef,
        params,
        time: new Date().getTime(),
    });
};
const getCustomCache = (key) => {
    const { time, customCacheRef, params } = cache.get(key) || {};
    if (!time) {
        return null;
    }
    return {
        time,
        params,
        data: customCacheRef?.current?.getCache(key)
    }
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

export { getCache, setCache, subscribe, setCustomCache, getCustomCache };
