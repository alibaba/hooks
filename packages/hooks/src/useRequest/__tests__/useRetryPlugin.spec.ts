import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

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
