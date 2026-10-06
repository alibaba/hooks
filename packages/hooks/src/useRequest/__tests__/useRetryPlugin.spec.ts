import { act, cleanup, type RenderHookResult, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';
import type { Options } from '../src/types';

describe('useRetryPlugin', () => {
  vi.useFakeTimers();

  const setUp = <TData = string, TParams extends any[] = any[]>(
    service: (...args: TParams) => Promise<TData>,
    options?: Parameters<typeof useRequest<TData, TParams>>[1],
  ) => renderHook((o) => useRequest<TData, TParams>(service, o || options));

  let hook: RenderHookResult<any, any>;
  let hook2: RenderHookResult<any, any>;

  test('useRetryPlugin should work', async () => {
    let errorCallback: any;
    act(() => {
      errorCallback = vi.fn();
      hook = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    // 第一次执行失败 (1000ms)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(1);

    // 第一次重试失败 (等待 2000ms 后重试 + 1000ms 执行)
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);

    // 第二次重试失败 (等待 4000ms 后重试 + 1000ms 执行)
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(3);

    // 第三次重试失败 (等待 8000ms 后重试 + 1000ms 执行)
    await act(async () => {
      vi.advanceTimersByTime(9000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);

    // 达到重试次数限制，不再重试
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);
    hook.unmount();

    // cancel should work
    act(() => {
      errorCallback = vi.fn();
      hook2 = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    // 第一次执行失败
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(1);

    // 第一次重试失败
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);

    // 取消重试
    act(() => {
      hook2.result.current.cancel();
    });
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook2.unmount();
  });
});

describe.each(['normal', 'strict'] as const)('retry lifecycle (%s)', (mode) => {
  const failure = new Error('request failed');
  const setup = (
    service: (value: string) => Promise<string>,
    options: Options<string, [string]> = {},
  ) => {
    const initialProps: Options<string, [string]> = {
      manual: true,
      retryCount: 2,
      retryInterval: 100,
      onError: vi.fn(),
      ...options,
    };
    const hook = renderHook((props) => useRequest(service, props), {
      initialProps,
      wrapper: mode === 'strict' ? StrictMode : undefined,
    });
    return {
      ...hook,
      updateOptions: (next: Options<string, [string]>) =>
        hook.rerender({ ...initialProps, ...next }),
    };
  };
  const failingService = () =>
    vi.fn(async (_value: string): Promise<string> => {
      throw failure;
    });
  const fail = async (run: (value: string) => Promise<string>, value = 'initial') => {
    await act(async () => {
      await expect(run(value)).rejects.toBe(failure);
    });
  };
  const advance = async (time: number) => {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(time);
    });
  };
  const deferred = () => {
    let resolve: (value: string) => void = (_value) => {
      throw new Error('Promise not initialized');
    };
    let reject: (reason: Error) => void = (_reason) => {
      throw new Error('Promise not initialized');
    };
    const promise = new Promise<string>((resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    });
    return { promise, resolve, reject };
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe.each([2, -1])('from retryCount=%s', (retryCount) => {
    describe.each([0, undefined])('disabled to %s', (disabledCount) => {
      test.each(['none', 'cancel', 'unmount'] as const)(
        'clears a pending retry before %s',
        async (action) => {
          const service = failingService();
          const onError = vi.fn();
          const onFinally = vi.fn();
          const hook = setup(service, { retryCount, onError, onFinally });
          await fail(hook.result.current.runAsync);
          hook.updateOptions({ retryCount: disabledCount });
          if (action === 'cancel')
            act(() => {
              hook.result.current.cancel();
            });
          if (action === 'unmount') hook.unmount();
          await advance(1000);
          expect(service).toHaveBeenCalledTimes(1);
          expect(onError).toHaveBeenCalledTimes(1);
          expect(onFinally).toHaveBeenCalledTimes(1);
        },
      );
    });
  });

  test.each([0, undefined])(
    'does not retry when initially disabled with %s',
    async (retryCount) => {
      const service = failingService();
      const hook = setup(service, { retryCount });
      await fail(hook.result.current.runAsync);
      await advance(1000);
      expect(service).toHaveBeenCalledTimes(1);
    },
  );

  test('can disable before any request has scheduled a retry', async () => {
    const service = failingService();
    const hook = setup(service);
    hook.updateOptions({ retryCount: 0 });
    await advance(1000);
    expect(service).not.toHaveBeenCalled();
    await fail(hook.result.current.runAsync);
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(1);
  });

  test('can cancel before any retry timer exists', () => {
    const service = failingService();
    const hook = setup(service);
    act(() => {
      hook.result.current.cancel();
    });
    expect(service).not.toHaveBeenCalled();
  });

  test.each(['cancel', 'unmount'] as const)(
    'preserves %s while retries remain enabled',
    async (action) => {
      const service = failingService();
      const hook = setup(service);
      await fail(hook.result.current.runAsync);
      if (action === 'cancel')
        act(() => {
          hook.result.current.cancel();
        });
      else hook.unmount();
      await advance(1000);
      expect(service).toHaveBeenCalledTimes(1);
    },
  );

  describe.each(['initial', 'retry'] as const)('with %s request in flight', (phase) => {
    test.each(['resolve', 'reject'] as const)(
      'preserves loading and the %s callback when disabled',
      async (outcome) => {
        const pending = deferred();
        const service = vi.fn((_value: string) => pending.promise);
        if (phase === 'retry') service.mockRejectedValueOnce(failure);
        const onError = vi.fn();
        const onSuccess = vi.fn();
        const hook = setup(service, { onError, onSuccess });
        if (phase === 'retry') {
          await fail(hook.result.current.runAsync);
          await advance(100);
        } else
          act(() => {
            hook.result.current.run('initial');
          });
        expect(hook.result.current.loading).toBe(true);
        hook.updateOptions({ retryCount: 0 });
        expect(hook.result.current.loading).toBe(true);
        await act(async () => {
          if (outcome === 'resolve') pending.resolve('completed');
          else pending.reject(failure);
        });
        expect(hook.result.current.loading).toBe(false);
        expect(onSuccess).toHaveBeenCalledTimes(outcome === 'resolve' ? 1 : 0);
        expect(onError).toHaveBeenCalledTimes(
          (phase === 'retry' ? 1 : 0) + (outcome === 'reject' ? 1 : 0),
        );
        if (outcome === 'resolve') expect(hook.result.current.data).toBe('completed');
        else expect(hook.result.current.error).toBe(failure);
        await advance(1000);
        expect(service).toHaveBeenCalledTimes(phase === 'retry' ? 2 : 1);
      },
    );
  });

  test('does not supersede a manual request made after disabling retries', async () => {
    const pending = deferred();
    const service = vi.fn((value: string) =>
      value === 'initial' ? Promise.reject(failure) : pending.promise,
    );
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    hook.updateOptions({ retryCount: 0 });
    const onResolved = vi.fn();
    const onRejected = vi.fn();
    act(() => {
      hook.result.current.runAsync('new').then(onResolved, onRejected);
    });
    await advance(100);
    expect(service).toHaveBeenCalledTimes(2);
    expect(service).toHaveBeenLastCalledWith('new');
    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      pending.resolve('new result');
    });
    expect(onResolved).toHaveBeenCalledWith('new result');
    expect(onRejected).not.toHaveBeenCalled();
    expect(hook.result.current.data).toBe('new result');
  });

  test('does not revive a stopped retry chain, and gives a new run its full budget', async () => {
    const service = failingService();
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    hook.updateOptions({ retryCount: 0 });
    hook.updateOptions({ retryCount: 2 });
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(1);
    await fail(hook.result.current.runAsync, 'new');
    await advance(300);
    expect(service).toHaveBeenCalledTimes(4);
    expect(service).toHaveBeenLastCalledWith('new');
  });

  test('preserves finite retry exhaustion', async () => {
    const service = failingService();
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(3);
  });

  test('preserves infinite retry until cancellation', async () => {
    const service = failingService();
    const hook = setup(service, { retryCount: -1 });
    await fail(hook.result.current.runAsync);
    await advance(300);
    expect(service).toHaveBeenCalledTimes(4);
    act(() => {
      hook.result.current.cancel();
    });
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(4);
  });

  test('stops retrying after success', async () => {
    const service = vi.fn(async (_value: string) => 'success').mockRejectedValueOnce(failure);
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(2);
    expect(hook.result.current.data).toBe('success');
  });

  test('preserves a fresh retry budget after a manual run', async () => {
    const service = failingService();
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    await advance(100);
    expect(service).toHaveBeenCalledTimes(2);
    await fail(hook.result.current.runAsync, 'manual');
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(5);
  });

  test('keeps a scheduled retry on an unrelated render and a truthy count change', async () => {
    const service = failingService();
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    hook.updateOptions({});
    await advance(50);
    expect(service).toHaveBeenCalledTimes(1);
    hook.updateOptions({ retryCount: 1 });
    await advance(50);
    expect(service).toHaveBeenCalledTimes(2);
    await advance(1000);
    expect(service).toHaveBeenCalledTimes(2);
  });

  test('keeps the current deadline and uses a changed interval for the next retry', async () => {
    const service = failingService();
    const hook = setup(service);
    await fail(hook.result.current.runAsync);
    hook.updateOptions({ retryInterval: 20 });
    await advance(99);
    expect(service).toHaveBeenCalledTimes(1);
    await advance(1);
    expect(service).toHaveBeenCalledTimes(2);
    await advance(19);
    expect(service).toHaveBeenCalledTimes(2);
    await advance(1);
    expect(service).toHaveBeenCalledTimes(3);
  });

  test('preserves an explicit zero retry interval', async () => {
    const service = failingService();
    const hook = setup(service, { retryInterval: 0 });
    await fail(hook.result.current.runAsync);
    await advance(10);
    expect(service).toHaveBeenCalledTimes(3);
  });

  test('preserves capped exponential backoff', async () => {
    const service = failingService();
    const hook = setup(service, { retryCount: 6, retryInterval: undefined });
    await fail(hook.result.current.runAsync);
    const intervals = [2000, 4000, 8000, 16000, 30000, 30000];
    for (const [index, interval] of intervals.entries()) {
      await advance(interval - 1);
      expect(service).toHaveBeenCalledTimes(index + 1);
      await advance(1);
      expect(service).toHaveBeenCalledTimes(index + 2);
    }
    await advance(60000);
    expect(service).toHaveBeenCalledTimes(7);
  });

  test.each(['none', 'cancel', 'unmount'] as const)(
    'keeps already-dispatched debounce ownership with %s',
    async (action) => {
      const service = failingService();
      const hook = setup(service, { debounceWait: 200 });
      act(() => {
        hook.result.current.run('initial');
      });
      await advance(200);
      expect(service).toHaveBeenCalledTimes(1);
      await advance(100);
      hook.updateOptions({ retryCount: 0, debounceWait: 200 });
      if (action === 'cancel')
        act(() => {
          hook.result.current.cancel();
        });
      if (action === 'unmount') hook.unmount();
      await advance(200);
      expect(service).toHaveBeenCalledTimes(action === 'none' ? 2 : 1);
    },
  );
});
