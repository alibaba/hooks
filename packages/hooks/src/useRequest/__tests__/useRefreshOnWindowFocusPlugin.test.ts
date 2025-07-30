import { describe, expect, test, vi } from 'vitest';
import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useRefreshOnWindowFocusPlugin', () => {
  vi.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

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
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    act(() => {
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
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

    act(() => {
      vi.advanceTimersByTime(1001);
    });
    await waitFor(() => expect(hook1.result.current.loading).toBe(false));
    expect(hook2.result.current.loading).toBe(false);

    act(() => {
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => expect(hook1.result.current.loading).toBe(false));
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
