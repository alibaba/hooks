import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useRetryPlugin', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;
  let hook2: RenderHookResult<any, any>;

  test('useRetryPlugin should work', async () => {
    let errorCallback: vi.Mock | undefined = undefined;
    act(() => {
      errorCallback = vi.fn();
      hook = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });

    // Wait for initial request to fail
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(1));

    // Wait for first retry
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(2));

    // Wait for second retry
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(3));

    // Wait for third retry
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(4));

    // No more retries should happen
    act(() => {
      vi.advanceTimersByTime(1000);
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

    // Wait for initial request to fail
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(1));

    // Wait for first retry
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(2));

    // Cancel the request
    act(() => {
      hook2.result.current.cancel();
    });

    // No more retries should happen after cancel
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook2.unmount();
  });
});
