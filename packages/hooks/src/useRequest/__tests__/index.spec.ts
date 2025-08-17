import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

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
});
