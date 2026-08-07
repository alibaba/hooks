import type { DebouncedFunc, DebounceSettings } from 'lodash';
import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';
import type { Plugin } from '../types';
import { cancelPendingPromise } from '../utils/cancelledError';

const useDebouncePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait },
) => {
  const debouncedRef = useRef<DebouncedFunc<any>>(undefined);
  const pendingRejectRef = useRef<(reason?: any) => void>(undefined);

  const options = useMemo(() => {
    const ret: DebounceSettings = {};
    if (debounceLeading !== undefined) {
      ret.leading = debounceLeading;
    }
    if (debounceTrailing !== undefined) {
      ret.trailing = debounceTrailing;
    }
    if (debounceMaxWait !== undefined) {
      ret.maxWait = debounceMaxWait;
    }
    return ret;
  }, [debounceLeading, debounceTrailing, debounceMaxWait]);

  useEffect(() => {
    if (debounceWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);

      debouncedRef.current = debounce(
        (callback: (...args: any[]) => void) => {
          callback();
        },
        debounceWait,
        options,
      );

      // debounce runAsync should be promise
      // https://github.com/lodash/lodash/issues/4400#issuecomment-834800398
      fetchInstance.runAsync = (...args) => {
        cancelPendingPromise(pendingRejectRef);

        return new Promise<void>((resolve, reject) => {
          pendingRejectRef.current = reject;
          debouncedRef.current?.(() => {
            pendingRejectRef.current = undefined;
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });
      };

      return () => {
        debouncedRef.current?.cancel();
        cancelPendingPromise(pendingRejectRef);
        fetchInstance.runAsync = _originRunAsync;
      };
    }
  }, [debounceWait, options]);

  if (!debounceWait) {
    return {};
  }

  return {
    onCancel: () => {
      debouncedRef.current?.cancel();
      cancelPendingPromise(pendingRejectRef);
    },
  };
};

export default useDebouncePlugin;
