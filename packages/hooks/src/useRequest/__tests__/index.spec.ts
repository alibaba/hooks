import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest, { CancelledError, isCancelledError } from '../index';

const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('useRequest', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  const setUp = <TData = string, TParams extends any[] = any[]>(
    service: (...args: TParams) => Promise<TData>,
    options?: Parameters<typeof useRequest<TData, TParams>>[1],
  ) => renderHook((o) => useRequest<TData, TParams>(service, o || options));

  let hook: RenderHookResult<any, any>;

  test('useRequest should auto run', async () => {
    let value = '';
    let success: string | undefined;
    const successCallback = (data: string) => {
      success = data;
    };
    const errorCallback = vi.fn();
    const beforeCallback = () => {
      value = 'before';
    };
    const finallyCallback = () => {
      value = 'finally';
    };
    // auto run success
    act(() => {
      hook = setUp(request, {
        onSuccess: successCallback,
        onError: errorCallback,
        onBefore: beforeCallback,
        onFinally: finallyCallback,
      });
    });
    expect(hook.result.current.loading).toBe(true);
    expect(value).toBe('before');
    expect(success).toBeUndefined();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(success).toBe('success');
    expect(hook.result.current.data).toBe('success');
    expect(value).toBe('finally');
    expect(errorCallback).toHaveBeenCalledTimes(0);

    //manual run fail
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);

    //manual run success
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.data).toBe('success');
    expect(hook.result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    hook.unmount();

    //auto run fail
    act(() => {
      hook = setUp(() => request(0), {
        onSuccess: successCallback,
        onError: errorCallback,
      });
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook.unmount();
  });

  test('useRequest should be manually triggered', async () => {
    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    expect(hook.result.current.loading).toBe(false);
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.data).toBe('success');
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.error).toEqual(new Error('fail'));
    hook.unmount();
  });

  test('useRequest runAsync should work', async () => {
    let success = '',
      error = '';

    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    act(() => {
      hook.result.current
        .runAsync(0)
        .then((res: any) => {
          success = res;
        })
        .catch((err: any) => {
          error = err;
        });
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(success).toBe('');
    expect(error).toEqual(new Error('fail'));
    success = '';
    error = '';
    act(() => {
      hook.result.current
        .runAsync(1)
        .then((res: any) => {
          success = res;
        })
        .catch((err: any) => {
          error = err;
        });
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(success).toBe('success');
    expect(error).toBe('');
    hook.unmount();
  });

  test('useRequest mutate should work', async () => {
    act(() => {
      hook = setUp(request, {});
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.data).toBe('success');
    act(() => {
      hook.result.current.mutate('hello');
    });
    expect(hook.result.current.data).toBe('hello');
    hook.unmount();
  });

  test('runAsync should resolve immediately when ready=false', async () => {
    // manual = true
    act(() => {
      hook = setUp(request, {
        manual: true,
        ready: false,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    let resolved = false;
    let value: any = 'init';

    await act(async () => {
      hook.result.current.runAsync(1).then((res: any) => {
        resolved = true;
        value = res;
      });
      await Promise.resolve();
    });

    expect(resolved).toBe(true);
    expect(value).toBeUndefined();
    expect(hook.result.current.loading).toBe(false);
    hook.unmount();

    // manual = false
    act(() => {
      hook = setUp(request, {
        ready: false,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    resolved = false;
    value = 'init';

    await act(async () => {
      hook.result.current.runAsync(1).then((res: any) => {
        resolved = true;
        value = res;
      });
      await Promise.resolve();
    });

    expect(resolved).toBe(true);
    expect(value).toBeUndefined();
    expect(hook.result.current.loading).toBe(false);
    hook.unmount();
  });

  // a service whose settle order is controlled by the caller
  const delayedRequest = (value: string, delay: number) =>
    new Promise<string>((resolve) => {
      setTimeout(() => resolve(value), delay);
    });

  test('runAsync should reject with a CancelledError when cancel is called', async () => {
    const onError = vi.fn();
    act(() => {
      hook = setUp(request, { manual: true, onError });
    });

    const onFulfilled = vi.fn();
    const onRejected = vi.fn();
    const onFinally = vi.fn();

    await act(async () => {
      hook.result.current.runAsync(1).then(onFulfilled).catch(onRejected).finally(onFinally);
      hook.result.current.cancel();
      vi.advanceTimersByTime(1000);
    });

    // before the fix the cancelled call stayed pending forever, so nothing below ran
    expect(onFulfilled).not.toHaveBeenCalled();
    expect(onRejected).toHaveBeenCalledTimes(1);
    expect(onRejected.mock.calls[0][0]).toBeInstanceOf(CancelledError);
    expect(onRejected.mock.calls[0][0]).toMatchObject({
      name: 'CancelledError',
      message: 'useRequest: the request was cancelled or superseded.',
    });
    expect(onFinally).toHaveBeenCalledTimes(1);
    // cancellation is not a failure: it reaches neither onError nor the error state
    expect(onError).not.toHaveBeenCalled();
    expect(hook.result.current.error).toBeUndefined();
    expect(hook.result.current.data).toBeUndefined();
    expect(hook.result.current.loading).toBe(false);
    hook.unmount();
  });

  test('isCancelledError should recognize only a true cancellation marker', () => {
    expect(isCancelledError(new CancelledError())).toBe(true);
    expect(isCancelledError({ __AHOOKS_CANCELLED_ERROR__: true })).toBe(true);
    expect(isCancelledError({ __AHOOKS_CANCELLED_ERROR__: false })).toBe(false);
    expect(isCancelledError(new Error('fail'))).toBe(false);
  });

  test('runAsync should reject the superseded call that settles first', async () => {
    act(() => {
      hook = setUp<string, [string, number]>(delayedRequest, { manual: true });
    });

    const onFirstFulfilled = vi.fn();
    const onFirstRejected = vi.fn();
    const onSecondFulfilled = vi.fn();

    await act(async () => {
      hook.result.current.runAsync('first', 500).then(onFirstFulfilled, onFirstRejected);
      hook.result.current.runAsync('second', 1000).then(onSecondFulfilled);
      // only the superseded call has settled by now
      vi.advanceTimersByTime(500);
    });

    expect(onFirstFulfilled).not.toHaveBeenCalled();
    expect(onFirstRejected).toHaveBeenCalledTimes(1);
    expect(isCancelledError(onFirstRejected.mock.calls[0][0])).toBe(true);
    // the loser publishes nothing, so `data` is not its value either
    expect(hook.result.current.data).toBeUndefined();
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(onSecondFulfilled).toHaveBeenCalledWith('second');
    expect(hook.result.current.data).toBe('second');
    expect(hook.result.current.loading).toBe(false);
    hook.unmount();
  });

  test('runAsync should reject the superseded call that settles last', async () => {
    act(() => {
      hook = setUp<string, [string, number]>(delayedRequest, { manual: true });
    });

    const onFirstFulfilled = vi.fn();
    const onFirstRejected = vi.fn();
    const onSecondFulfilled = vi.fn();

    await act(async () => {
      hook.result.current.runAsync('first', 1000).then(onFirstFulfilled, onFirstRejected);
      hook.result.current.runAsync('second', 200).then(onSecondFulfilled);
      // only the winning call has settled by now
      vi.advanceTimersByTime(200);
    });

    expect(onSecondFulfilled).toHaveBeenCalledWith('second');
    expect(hook.result.current.data).toBe('second');
    expect(onFirstRejected).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(800);
    });

    expect(onFirstFulfilled).not.toHaveBeenCalled();
    expect(onFirstRejected).toHaveBeenCalledTimes(1);
    expect(isCancelledError(onFirstRejected.mock.calls[0][0])).toBe(true);
    // the late loser must not overwrite the winner's data
    expect(hook.result.current.data).toBe('second');
    hook.unmount();
  });

  test('runAsync should report a superseded rejection as cancelled, not as the service error', async () => {
    const onError = vi.fn();
    act(() => {
      hook = setUp(request, { manual: true, onError });
    });

    const onFirstFulfilled = vi.fn();
    const onFirstRejected = vi.fn();

    await act(async () => {
      // the first call rejects with `new Error('fail')`, but a newer call supersedes it
      hook.result.current.runAsync(0).then(onFirstFulfilled, onFirstRejected);
      hook.result.current.runAsync(2);
      vi.advanceTimersByTime(1000);
    });

    expect(onFirstFulfilled).not.toHaveBeenCalled();
    expect(onFirstRejected).toHaveBeenCalledTimes(1);
    expect(isCancelledError(onFirstRejected.mock.calls[0][0])).toBe(true);
    // the stale error reaches neither the caller, nor onError, nor the state
    expect(onFirstRejected.mock.calls[0][0]).not.toEqual(new Error('fail'));
    expect(onError).not.toHaveBeenCalled();
    expect(hook.result.current.error).toBeUndefined();
    expect(hook.result.current.data).toBe('success');
    hook.unmount();
  });

  test('run should stay silent when the request is cancelled', async () => {
    errorSpy.mockClear();
    act(() => {
      // no onError, so `run` would fall back to console.error for a real failure
      hook = setUp(request, { manual: true });
    });

    await act(async () => {
      hook.result.current.run(1);
      hook.result.current.cancel();
      vi.advanceTimersByTime(1000);
    });

    expect(errorSpy).not.toHaveBeenCalled();
    hook.unmount();
  });

  test('useRequest defaultParams should work', async () => {
    act(() => {
      hook = setUp<string, [number, number, number]>(request, {
        defaultParams: [1, 2, 3],
      });
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.params).toEqual([1, 2, 3]);
    expect(hook.result.current.data).toBe('success');
    expect(hook.result.current.loading).toBe(false);
    hook.unmount();
  });

  test('should infer default parameter types from service', () => {
    const service = async (a = 1, b = 1) => {
      return `${a + b}`;
    };

    const { result } = renderHook(() =>
      useRequest(service, {
        manual: true,
      }),
    );

    act(() => {
      result.current.run(1, 2);
    });

    const assertRunParamTypes = () => {
      // @ts-expect-error should reject non-number params
      result.current.run('1', 2);
    };

    expect(assertRunParamTypes).toBeDefined();
  });
});
