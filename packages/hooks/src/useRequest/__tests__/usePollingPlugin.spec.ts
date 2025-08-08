import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

describe('usePollingPlugin', () => {
  vi.useFakeTimers();

  const setUp = <TData = string, TParams extends any[] = any[]>(
    service: (...args: TParams) => Promise<TData>,
    options?: Parameters<typeof useRequest<TData, TParams>>[1],
  ) => renderHook((o) => useRequest<TData, TParams>(service, o || options));

  let hook: RenderHookResult<any, any>;

  test('usePollingPlugin pollingInterval=100 pollingWhenHidden=true  should work', async () => {
    const callback = vi.fn();
    act(() => {
      hook = setUp(
        () => {
          callback();
          return request(1);
        },
        {
          pollingInterval: 100,
          pollingWhenHidden: true,
        },
      );
    });
    expect(hook.result.current.loading).toBe(true);

    // 第一次请求完成
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.data).toBe('success');
    expect(callback).toHaveBeenCalledTimes(1);

    // 第一次 polling (100ms 间隔 + 1000ms 执行)
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    // 第二次 polling
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.cancel();
    });

    // 取消后不应该再 polling
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    // 手动重新运行
    act(() => {
      hook.result.current.run();
    });
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(4);

    // 恢复 polling
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });

  let hook2: RenderHookResult<any, any>;
  test('usePollingPlugin pollingErrorRetryCount=3 should work', async () => {
    // if request error and set pollingErrorRetryCount
    // and the number of consecutive failures exceeds pollingErrorRetryCount, polling stops
    let errorCallback: any;
    act(() => {
      errorCallback = vi.fn();
      hook2 = setUp(() => request(0), {
        pollingErrorRetryCount: 3,
        pollingInterval: 100,
        pollingWhenHidden: true,
        onError: errorCallback,
      });
    });

    expect(hook2.result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);

    // 第一次请求失败
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook2.result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);

    // 第一次重试失败 (100ms 间隔 + 1000ms 执行)
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);

    // 第二次重试失败
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(errorCallback).toHaveBeenCalledTimes(3);

    // 第三次重试失败
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);

    // 达到重试限制，停止 polling
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);

    // 手动重新运行
    act(() => {
      hook2.result.current.run();
    });
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(5);
  });
});
