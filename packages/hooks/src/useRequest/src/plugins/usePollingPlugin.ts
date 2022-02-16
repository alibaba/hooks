import { useRef } from 'react';
import useUpdateEffect from '../../../useUpdateEffect';
import type { Plugin, Timeout } from '../types';
import isDocumentVisible from '../utils/isDocumentVisible';
import subscribeReVisible from '../utils/subscribeReVisible';

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true },
) => {
  const timerRef = useRef<Timeout>();
  const unsubscribeRef = useRef<() => void>();

  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    unsubscribeRef.current?.();
  };

  const cancelPolling = () => {
    stopPolling();
    timerRef.current = -1;
  };

  useUpdateEffect(() => {
    if (timerRef.current === -1) return;

    if (!pollingInterval) {
      stopPolling();
    } else if (isDocumentVisible() || pollingWhenHidden) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    }
  }, [pollingInterval]);

  if (!pollingInterval) {
    return {
      onCancel: cancelPolling
    };
  }

  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      // if pollingWhenHidden = false && document is hidden, then stop polling and subscribe revisible
      if (!pollingWhenHidden && !isDocumentVisible()) {
        unsubscribeRef.current = subscribeReVisible(() => {
          fetchInstance.refresh();
        });
        return;
      }

      timerRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel: cancelPolling
  };
};

export default usePollingPlugin;
