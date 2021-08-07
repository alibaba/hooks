import { useRef } from 'react';
import type { UseRequestPlugin, UseRequestPluginInitContext } from '../type';

const WINDOW_CACHE_STORAGE = 'useRequest__window_cache_storage__';
const CACHE_NAME = 'useRequest__swr_cache__';

const getCacheKey = (key) => `${CACHE_NAME}/${key}`;

const windowCacheStorage = {
  _store: {},
  setItem(key, value) {
    this._store[key] = value;
  },
  getItem(key) {
    return this._store[key];
  },
};

const getCacheInstance = (type) => {
  let cacheStorage;
  switch (type) {
    case 'localStorage': {
      cacheStorage = window.localStorage;
      break;
    }
    case 'sessionStorage': {
      cacheStorage = window.sessionStorage;
      break;
    }
    case 'memory':
    default: {
      cacheStorage = windowCacheStorage;
    }
  }
  window[WINDOW_CACHE_STORAGE] = cacheStorage;
  return {
    setCache: (key, data, timestamp) => {
      cacheStorage.setItem(
        getCacheKey(key),
        JSON.stringify({
          data,
          timestamp,
        }),
      );
    },
    getCache: (key) => {
      return JSON.parse(cacheStorage.getItem(getCacheKey(key)) || '{}');
    },
  };
};

const useSWRPlugin: UseRequestPlugin<{
  cacheKey: string;
  cacheTime: number;
  staleTime: number;
  cacheType: 'localStorage' | 'sessionStorage' | 'memory';
}> = ({ cacheKey, cacheTime = 5 * 60 * 1000, staleTime, cacheType }) => {
  const context = useRef<UseRequestPluginInitContext | null>(null);

  const timeoutRef = useRef<any>();

  const cacheInstance = getCacheInstance(cacheType);

  const startClearCache = () => {
    if (cacheTime !== -1) {
      timeoutRef.current = setTimeout(() => {
        cacheInstance.setCache(cacheKey, null, 0);
      }, cacheTime);
    }
  };

  return {
    init: (state, ctx) => {
      context.current = ctx;
    },
    onBefore: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const cache = cacheInstance.getCache(cacheKey);
      if (cache && cache.timestamp && staleTime) {
        if (Date.now() - cache.timestamp > staleTime) {
          context.current!.setSuspended(false);
        } else {
          context.current!.setSuspended(true);
        }
      }
      if (cache) {
        context.current!.setData(cache.data);
      }
    },
    onSuccess: (params, res) => {
      cacheInstance.setCache(cacheKey, res, Date.now());
      startClearCache();
    },
  };
};

export default useSWRPlugin;
