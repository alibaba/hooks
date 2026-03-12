import type { DebouncedFunc, ThrottleSettings } from 'lodash';
import throttle from 'lodash/throttle';
import { useEffect, useRef } from 'react';
import type { Plugin } from '../types';

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const throttledRef = useRef<DebouncedFunc<any>>(undefined);

  const options: ThrottleSettings = {};

  if (throttleLeading !== undefined) {
    options.leading = throttleLeading;
  }
  if (throttleTrailing !== undefined) {
    options.trailing = throttleTrailing;
  }

  useEffect(() => {
    if (throttleWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);

      // Track the current promise and when it was created
      let currentPromise: Promise<any> | null = null;
      let promiseCreatedAt = 0;

      throttledRef.current = throttle(
        (callback) => {
          callback();
        },
        throttleWait,
        options,
      );

      // throttle runAsync should be promise
      // https://github.com/lodash/lodash/issues/4400#issuecomment-834800398
      fetchInstance.runAsync = (...args) => {
        const now = Date.now();

        // If there's a current promise and it was created within the throttle window,
        // return it to share the result
        if (currentPromise && now - promiseCreatedAt < throttleWait) {
          return currentPromise;
        }

        // Create a new promise
        promiseCreatedAt = now;
        currentPromise = new Promise((resolve, reject) => {
          throttledRef.current?.(() => {
            // Execute the request
            _originRunAsync(...args)
              .then((result) => {
                resolve(result);
                // Clear current promise after a delay to allow trailing calls
                setTimeout(() => {
                  if (currentPromise && Date.now() - promiseCreatedAt >= throttleWait) {
                    currentPromise = null;
                  }
                }, 0);
              })
              .catch((error) => {
                reject(error);
                // Clear current promise after a delay to allow trailing calls
                setTimeout(() => {
                  if (currentPromise && Date.now() - promiseCreatedAt >= throttleWait) {
                    currentPromise = null;
                  }
                }, 0);
              });
          });
        });

        return currentPromise;
      };

      return () => {
        fetchInstance.runAsync = _originRunAsync;
        throttledRef.current?.cancel();
      };
    }
  }, [throttleWait, throttleLeading, throttleTrailing]);

  if (!throttleWait) {
    return {};
  }

  return {
    onCancel: () => {
      throttledRef.current?.cancel();
    },
  };
};

export default useThrottlePlugin;
