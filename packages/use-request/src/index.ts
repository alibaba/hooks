import { useState, useEffect, useRef } from 'react';
import type { UseRequest } from './types';
import { wrapPromise } from './utils';

const useRequestImplement = (fetcher, options) => {
  const { manual, defaultParams, plugins = [], onSuccess, onError } = options;

  // basic
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const suspended = useRef(false);
  const paramsCache = useRef<any>(null);

  const getParamWithCache = (...params) => {
    if (!params) {
      return [];
    }
    if (params) {
      paramsCache.current = params;
      return params;
    }
    return paramsCache.current;
  };

  const runPluginHandler = async (event, ...args) => {
    for (const plugin of plugins) {
      if (plugin[event]) {
        await plugin[event](...args);
      }
    }
  };

  const runImplement = (params) => {
    (async () => {
      const runParams = getParamWithCache(params);
      console.log('>> runParams', runParams);
      await runPluginHandler('onBefore', runParams);
      if (suspended.current) {
        return;
      }
      setLoading(true);
      fetcher(...runParams)
        .then(async (res) => {
          await runPluginHandler('onSuccess', runParams, res);
          setData(res);
          if (onSuccess) {
            onSuccess(res, runParams);
          }
        })
        .catch(async (err) => {
          await runPluginHandler('onError', runParams, err);
          setError(err);
          if (onError) {
            onError(err, runParams);
          }
        })
        .finally(async () => {
          await runPluginHandler('onComplete', runParams);
          setLoading(false);
        });
    })();
  };

  let run = runImplement;
  plugins.forEach((plugin) => {
    if (plugin.run) {
      run = plugin.run(runImplement);
    }
  });

  const runAsync = (...params) => {
    const runParams = getParamWithCache(...params);
    return fetcher(...runParams);
  };

  const state = { loading, data, error, suspended };
  const ctx = {
    run,
    setData,
    setSuspended: (suspend) => {
      suspended.current = suspend;
    },
  };
  plugins.forEach((plugin) => {
    if (plugin.init) {
      plugin.init(state, ctx, options);
    }
  });

  useEffect(() => {
    if (!manual) {
      run(defaultParams);
    }
  }, []);

  const pluginReturns = plugins.reduce((memo, plugin) => {
    return {
      ...memo,
      ...(plugin.returns || {}),
    };
  }, {});

  return {
    data,
    error,
    loading,
    run,
    runAsync,
    ...pluginReturns,
  };
};

const pendingMap = new WeakMap();
const useSuspense = (fetcher, options) => {
  let f = pendingMap.get(fetcher);
  if (!f) {
    f = wrapPromise(fetcher(options.defaultParams));
    pendingMap.set(fetcher, f);
  }
  return {
    data: f.read(),
  };
};

const useRequest: UseRequest = (fetcher, options) => {
  if (options.suspense) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSuspense(fetcher, options);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useRequestImplement(fetcher, options);
};

export default useRequest;
