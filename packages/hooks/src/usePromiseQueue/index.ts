import { useCallback, useEffect, useRef, useState } from 'react';

type PromiseFunction<T = any> = () => Promise<T>;
type QueueItem<T> = PromiseFunction<T>;

interface UsePromiseQueueOptions<T> {
  initQueue?: QueueItem<T>[];
  maxConcurrent?: number;
}

type ResultItem<T> = {
  success: boolean;
  value: T;
  reason: any;
  index: number;
};

const usePromiseQueue = <T = any>({
  initQueue = [],
  maxConcurrent = 1,
}: UsePromiseQueueOptions<T> = {}) => {
  const indexRef = useRef<number>(-1);
  const processingCountRef = useRef<number>(0);
  const [processingCount, setProcessingCount] = useState<number>(0);
  const [queue, setQueue] = useState<QueueItem<T>[]>(initQueue);
  const [results, setResults] = useState<ResultItem<T>[]>([]);

  const addToQueue = useCallback(
    (promiseFunctionArgs: PromiseFunction<T> | PromiseFunction<T>[]) => {
      setQueue((prevQueue) =>
        Array.isArray(promiseFunctionArgs)
          ? [...prevQueue, ...promiseFunctionArgs]
          : [...prevQueue, promiseFunctionArgs],
      );
    },
    [],
  );

  const processQueue = useCallback(async () => {
    while (processingCountRef.current < maxConcurrent && queue.length > 0) {
      const currentIndex = ++indexRef.current;
      const promiseFunction = queue.shift()!;
      processingCountRef.current++;
      setProcessingCount((prevCount) => prevCount + 1);

      Promise.resolve(promiseFunction())
        .then((result) => {
          setResults((prevResults) => [
            ...prevResults.filter((r) => r.index < currentIndex),
            { success: true, value: result, reason: undefined, index: currentIndex },
            ...prevResults.filter((r) => r.index > currentIndex),
          ]);
        })
        .catch((error) => {
          setResults((prevResults) => [
            ...prevResults.filter((r) => r.index < currentIndex),
            { success: false, reason: error, value: undefined as any, index: currentIndex },
            ...prevResults.filter((r) => r.index > currentIndex),
          ]);
        })
        .finally(() => {
          setQueue((preQueue) => preQueue.filter((r) => r !== promiseFunction));
          setProcessingCount((prevCount) => prevCount - 1);
          processingCountRef.current--;
        });
    }
  }, [maxConcurrent, queue]);

  useEffect(() => {
    processQueue();
  }, [processQueue, queue]);

  return {
    addToQueue,
    results,
    isProcessing: processingCount > 0,
  };
};

export default usePromiseQueue;
