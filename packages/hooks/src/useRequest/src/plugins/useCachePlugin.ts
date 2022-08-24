import { useRef } from 'react';
import useCreation from '../../../useCreation';
import useUnmount from '../../../useUnmount';
import type { Plugin } from '../types';
import * as cache from '../utils/cache';
import type { CachedData } from '../utils/cache';
import * as cachePromise from '../utils/cachePromise';
import * as cacheSubscribe from '../utils/cacheSubscribe';
import { isFunction, isString } from '../../../utils';

const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    setCache: customSetCache,
    getCache: customGetCache,
  },
) => {
  const unSubscribeRef = useRef<() => void>();

  const currentPromiseRef = useRef<Promise<any>>();

  // store dynamic cacheKey
  const cacheKeyRef = useRef<string | undefined>(isString(cacheKey) ? cacheKey : undefined);

  const _subscribe = () => {
    if (!cacheKeyRef.current) return;
    // subscribe same cachekey update, trigger update
    unSubscribeRef.current = cacheSubscribe.subscribe(cacheKeyRef.current, (data) => {
      fetchInstance.setState({ data });
    });
  };

  const _unsubscribe = () => {
    unSubscribeRef.current?.();
  };

  const _setCache = (cachedData: CachedData) => {
    if (!cacheKeyRef.current) return;
    const key = cacheKeyRef.current;
    if (customSetCache) {
      customSetCache(cachedData);
    } else {
      cache.setCache(key, cacheTime, cachedData);
    }

    // cancel subscribe, avoid trgger self
    _unsubscribe();

    cacheSubscribe.trigger(key, cachedData.data);

    // resubscribe
    _subscribe();
  };

  const _getCache = (params: any[] = []) => {
    if (!cacheKeyRef.current) return;
    if (customGetCache) {
      return customGetCache(params);
    }
    return cache.getCache(cacheKeyRef.current);
  };

  useCreation(() => {
    if (!cacheKeyRef.current) return;

    // get data from cache when init
    const cacheData = _getCache();
    if (cacheData && Object.hasOwnProperty.call(cacheData, 'data')) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;
      if (staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime) {
        fetchInstance.state.loading = false;
      }
    }

    _subscribe();
  }, []);

  useUnmount(_unsubscribe);

  if (!cacheKey) {
    return {};
  }

  return {
    onBefore: (params) => {
      // unsubscribe last cacheKey before change
      _unsubscribe();

      // set new cacheKey
      cacheKeyRef.current = isString(cacheKey)
        ? cacheKey
        : isFunction(cacheKey)
        ? cacheKey(...params)
        : undefined;

      // resubscribe new cacheKey
      _subscribe();

      const cacheData = _getCache(params);

      if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
        return {};
      }

      // If the data is fresh, stop request
      if (staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime) {
        return {
          loading: false,
          data: cacheData?.data,
          returnNow: true,
        };
      } else {
        // If the data is stale, return data, and request continue
        return {
          data: cacheData?.data,
        };
      }
    },
    onRequest: (service, args) => {
      const currentCacheKey = cacheKeyRef.current;
      let servicePromise = currentCacheKey
        ? cachePromise.getCachePromise(currentCacheKey)
        : undefined;

      // If has servicePromise, and is not trigger by self, then use it
      if (servicePromise && servicePromise !== currentPromiseRef.current) {
        return { servicePromise };
      }

      servicePromise = service(...args);
      currentPromiseRef.current = servicePromise;
      if (currentCacheKey) {
        cachePromise.setCachePromise(currentCacheKey, servicePromise);
      }
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      _setCache({
        data,
        params,
        time: new Date().getTime(),
      });
    },
    onMutate: (data) => {
      _setCache({
        data,
        params: fetchInstance.state.params,
        time: new Date().getTime(),
      });
    },
  };
};

export default useCachePlugin;
