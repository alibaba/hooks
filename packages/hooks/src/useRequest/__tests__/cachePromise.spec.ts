import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useRequest, { CancelledError } from '../index';
import { getCachePromise } from '../src/utils/cachePromise';

function deferred() {
  let resolve!: (value: string) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<string>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('useRequest overlapping cached promises', () => {
  test.each(['resolve', 'reject'] as const)(
    'keeps sharing the current request when a superseded request %ss',
    async (outcome) => {
      const previous = deferred();
      const current = deferred();
      const cacheKey = `overlapping-promises-${outcome}`;
      const service = vi
        .fn()
        .mockReturnValueOnce(previous.promise)
        .mockReturnValueOnce(current.promise)
        .mockResolvedValue('duplicate request');
      const options = { manual: true, cacheKey, cacheTime: 0 };
      const hook = renderHook(() => ({
        first: useRequest(service, options),
        second: useRequest(service, options),
      }));
      let superseded!: Promise<unknown>;
      let pending!: Promise<string>;
      act(() => {
        superseded = hook.result.current.first.runAsync().catch((error) => error);
        pending = hook.result.current.first.runAsync();
      });
      await act(async () => {
        if (outcome === 'resolve') {
          previous.resolve('old result');
        } else {
          previous.reject(new Error('old failure'));
        }
        expect(await superseded).toBeInstanceOf(CancelledError);
      });

      let shared!: Promise<string>;
      act(() => {
        shared = hook.result.current.second.runAsync();
      });
      const callCount = service.mock.calls.length;
      await act(async () => {
        current.resolve('latest result');
        await pending;
        await shared;
      });

      expect(callCount).toBe(2);
      expect(hook.result.current.first.data).toBe('latest result');
      expect(hook.result.current.second.data).toBe('latest result');
      expect(getCachePromise(cacheKey)).toBeUndefined();
      hook.unmount();
    },
  );
});
