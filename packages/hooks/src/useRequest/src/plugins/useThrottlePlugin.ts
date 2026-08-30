import type { DebouncedFunc, ThrottleSettings } from 'lodash';
import throttle from 'lodash/throttle';
import { useEffect, useRef } from 'react';
import type { Plugin } from '../types';
import { cancelPendingPromise } from '../utils/cancelledError';

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const throttledRef = useRef<DebouncedFunc<any>>(undefined);
  const pendingRejectRef = useRef<(reason?: unknown) => void>(undefined);

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
        cancelPendingPromise(pendingRejectRef);

        return new Promise((resolve, reject) => {
          let callbackInvoked = false;
          pendingRejectRef.current = reject;
          throttledRef.current?.(() => {
            callbackInvoked = true;
            pendingRejectRef.current = undefined;
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });

          if (!callbackInvoked && options.trailing === false) {
            cancelPendingPromise(pendingRejectRef);
          }
        });
      };

      return () => {
        fetchInstance.runAsync = _originRunAsync;
        throttledRef.current?.cancel();
        cancelPendingPromise(pendingRejectRef);
      };
    }
  }, [throttleWait, throttleLeading, throttleTrailing]);

  if (!throttleWait) {
    return {};
  }

  return {
    onCancel: () => {
      throttledRef.current?.cancel();
      cancelPendingPromise(pendingRejectRef);
    },
  };
};

export default useThrottlePlugin;
