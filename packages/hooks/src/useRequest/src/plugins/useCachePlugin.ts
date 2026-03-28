import { useRef } from 'react';
import useCreation from '../../../useCreation';
import useUnmount from '../../../useUnmount';
import type { Plugin } from '../types';
import { setCache, getCache } from '../utils/cache';
import type { CachedData } from '../utils/cache';
import { setCachePromise, getCachePromise } from '../utils/cachePromise';
import { trigger, subscribe, triggerLoading, subscribeLoading } from '../utils/cacheSubscribe';

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
  const unSubscribeRef = useRef<() => void>(undefined);
  const unSubscribeLoadingRef = useRef<() => void>(undefined);

  const currentPromiseRef = useRef<Promise<any>>(undefined);

  const _setCache = (key: string, cachedData: CachedData) => {
    if (customSetCache) {
      customSetCache(cachedData);
    } else {
      setCache(key, cacheTime, cachedData);
    }
    trigger(key, cachedData.data);
  };

  const _getCache = (key: string, params: any[] = []) => {
    if (customGetCache) {
      return customGetCache(params);
    }
    return getCache(key);
  };

  useCreation(() => {
    if (!cacheKey) {
      return;
    }

    // get data from cache when init
    const cacheData = _getCache(cacheKey);
    if (cacheData && Object.hasOwnProperty.call(cacheData, 'data')) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;
      if (staleTime === -1 || Date.now() - cacheData.time <= staleTime) {
        fetchInstance.state.loading = false;
      }
    }

    // subscribe same cachekey update, trigger update
    unSubscribeRef.current = subscribe(cacheKey, (data) => {
      fetchInstance.setState({ data, loading: false });
    });

    // subscribe same cachekey loading update, trigger update
    unSubscribeLoadingRef.current = subscribeLoading(cacheKey, () => {
      fetchInstance.setState({ loading: true });
    });
  }, []);

  useUnmount(() => {
    unSubscribeRef.current?.();
    unSubscribeLoadingRef.current?.();
  });

  if (!cacheKey) {
    return {};
  }

  return {
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params);

      if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
        return {};
      }

      // If the data is fresh, stop request
      if (staleTime === -1 || Date.now() - cacheData.time <= staleTime) {
        return {
          loading: false,
          data: cacheData?.data,
          error: undefined,
          returnNow: true,
        };
      } else {
        // If the data is stale, return data, and request continue
        return {
          data: cacheData?.data,
          error: undefined,
        };
      }
    },
    onRequest: (service, args) => {
      let servicePromise = getCachePromise(cacheKey);

      // If has servicePromise, and is not trigger by self, then use it
      if (servicePromise && servicePromise !== currentPromiseRef.current) {
        return { servicePromise };
      }

      servicePromise = service(...args);
      currentPromiseRef.current = servicePromise;
      setCachePromise(cacheKey, servicePromise);
      // notify other same cacheKey components that loading has started
      triggerLoading(cacheKey);
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        // cancel subscribe, avoid trgger self
        unSubscribeRef.current?.();
        _setCache(cacheKey, {
          data,
          params,
          time: Date.now(),
        });
        // resubscribe
        unSubscribeRef.current = subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d, loading: false });
        });
      }
    },
    onMutate: (data) => {
      if (cacheKey) {
        // cancel subscribe, avoid trigger self
        unSubscribeRef.current?.();
        _setCache(cacheKey, {
          data,
          params: fetchInstance.state.params,
          time: Date.now(),
        });
        // resubscribe
        unSubscribeRef.current = subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d, loading: false });
        });
      }
    },
  };
};

export default useCachePlugin;
