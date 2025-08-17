import { act, fireEvent, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

describe('useRefreshOnWindowFocusPlugin', () => {
  vi.useFakeTimers();

  const setUp = <TData = string, TParams extends any[] = any[]>(
    service: (...args: TParams) => Promise<TData>,
    options?: Parameters<typeof useRequest<TData, TParams>>[1],
  ) => renderHook((o) => useRequest<TData, TParams>(service, o || options));

  let hook: RenderHookResult<any, any>;
  let hook1: RenderHookResult<any, any>;
  let hook2: RenderHookResult<any, any>;

  test('useRefreshOnWindowFocusPlugin should work', async () => {
    act(() => {
      hook = setUp(request, {
        refreshOnWindowFocus: true,
        focusTimespan: 5000,
      });
    });
    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook.result.current.loading).toBe(false);
    act(() => {
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(hook.result.current.loading).toBe(false);
    act(() => {
      vi.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toBe(true);
  });

  test('fix: multiple unsubscriptions should not delete the last subscription listener ', async () => {
    act(() => {
      hook1 = setUp(request, {
        refreshOnWindowFocus: true,
      });
      hook2 = setUp(request, {
        refreshOnWindowFocus: true,
      });
    });

    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1001);
    });
    expect(hook1.result.current.loading).toBe(false);
    expect(hook2.result.current.loading).toBe(false);

    act(() => {
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(hook1.result.current.loading).toBe(false);
    expect(hook2.result.current.loading).toBe(false);

    hook1.unmount();

    act(() => {
      vi.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toBe(false);
    // hook2 should not unsubscribe
    expect(hook2.result.current.loading).toBe(true);
  });
});
