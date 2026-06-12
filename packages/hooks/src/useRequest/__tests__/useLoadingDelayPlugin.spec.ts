import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

describe('useLoadingDelayPlugin', () => {
  vi.useFakeTimers();

  const setUp = <TData = string, TParams extends any[] = any[]>(
    service: (...args: TParams) => Promise<TData>,
    options?: Parameters<typeof useRequest<TData, TParams>>[1],
  ) => renderHook((o) => useRequest<TData, TParams>(service, o || options));

  let hook: RenderHookResult<ReturnType<typeof useRequest>, any>;

  afterEach(() => {
    hook.unmount();
  });

  test('useLoadingDelayPlugin should work', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      hook = setUp(request, {
        loadingDelay: 500,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      vi.advanceTimersByTime(501);
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useLoadingDelayPlugin should no update loading when ready is false', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
        ready: false,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(hook.result.current.loading).toBe(false);
  });

  test('useLoadingDelayPlugin should update loading when ready is undefined', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(hook.result.current.loading).toBe(true);
  });
});
