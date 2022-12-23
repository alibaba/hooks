import { useRef } from 'react';
import useUpdateEffect from '../../../useUpdateEffect';
import type { Plugin, Timeout } from '../types';
import isDocumentVisible from '../utils/isDocumentVisible';
import subscribeReVisible from '../utils/subscribeReVisible';

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 },
) => {
  const timerRef = useRef<Timeout>();
  const unsubscribeRef = useRef<() => void>();
  const countRef = useRef<number>(0);
  const pollingCountRef = useRef<number>(0);

  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    unsubscribeRef.current?.();
  };

  useUpdateEffect(() => {
    if (!pollingInterval) {
      stopPolling();
    }
  }, [pollingInterval]);

  if (!pollingInterval) {
    return {};
  }

  return {
    onBefore: () => {
      stopPolling();
      return {
        polling: {
          pollingCounter: pollingCountRef.current,
          isPolling: pollingInterval > 0,
        },
      };
    },
    onRequest: () => {
      pollingCountRef.current += 1;
    },
    onError: () => {
      countRef.current += 1;
      return {
        polling: {
          pollingCounter: pollingCountRef.current,
          isPolling: true,
        },
      };
    },
    onSuccess: () => {
      countRef.current = 0;
      return {
        polling: {
          pollingCounter: pollingCountRef.current,
          isPolling: true,
        },
      };
    },
    onFinally: () => {
      if (
        pollingErrorRetryCount === -1 ||
        // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
        (pollingErrorRetryCount !== -1 && countRef.current <= pollingErrorRetryCount)
      ) {
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
      } else {
        countRef.current = 0;

        if (pollingCountRef.current !== 0) {
          pollingCountRef.current = 0;
          fetchInstance.setState({
            polling: {
              pollingCounter: pollingCountRef.current,
              isPolling: false,
            },
          });
        }
      }
    },
    onCancel: () => {
      stopPolling();

      pollingCountRef.current = 0;
      return {
        polling: {
          pollingCounter: pollingCountRef.current,
          isPolling: false,
        },
      };
    },
  };
};

export default usePollingPlugin;
