import type { DependencyList } from 'react';
import { useCallback, useLayoutEffect } from 'react';

export const AbortedErrorMessage = 'The promise has been aborted';
export const InvokeInRenderErrorMessage = "Don't invoke this callback in rendering";

function abortablePromise<T extends Promise<any>>(promise: T, controller: AbortController): T {
  const signal = controller.signal;
  if (signal.aborted) return Promise.reject(new Error(AbortedErrorMessage)) as T;

  return new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => {
      reject(new Error(AbortedErrorMessage));
    });
    promise.then(resolve).catch(reject);
  }) as T;
}

interface GetPromise<R extends Promise<any>> {
  (): R;
  abortController?: AbortController;
}

export default function usePromise<R extends Promise<any>>(
  callback: () => R,
  deps: DependencyList,
): () => R {
  const getPromise: GetPromise<R> = useCallback(() => {
    const promise = callback();
    if (getPromise.abortController == null) throw new Error(InvokeInRenderErrorMessage);
    return abortablePromise(promise, getPromise.abortController);
  }, deps);

  useLayoutEffect(() => {
    const abortController = new AbortController();
    getPromise.abortController = abortController;
    return () => abortController.abort();
  }, [getPromise]);
  return getPromise;
}
