import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useRequest from '../index';

describe('useCachePlugin shared promise loading', () => {
  vi.useFakeTimers();

  const request = () =>
    new Promise<string>((resolve) =>
      setTimeout(() => {
        resolve('success');
      }, 1000),
    );

  const setup = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook(() => useRequest(service, options));

  // When hook1 refreshes (starts a new shared request), hook2 should also show loading: true
  // This is the bug: hook2 is not notified that a request has started for the shared cacheKey
  test('when one hook triggers request with shared cacheKey, other hooks should also show loading', async () => {
    const hook1 = setup(request, { cacheKey: 'shared-loading-bug-test' });
    const hook2 = setup(request, { cacheKey: 'shared-loading-bug-test' });

    // Initial: both loading
    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // After initial request: both have data, not loading
    expect(hook1.result.current.loading).toBe(false);
    expect(hook2.result.current.loading).toBe(false);

    // Advance time past staleTime=0 to make data stale
    vi.advanceTimersByTime(1);

    // Now hook1 manually triggers a new request
    act(() => {
      hook1.result.current.run();
    });

    // Both hooks should show loading: true since a shared request is in flight
    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true); // BUG: this fails without the fix

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // After request completes: both have data, not loading
    expect(hook1.result.current.loading).toBe(false);
    expect(hook2.result.current.loading).toBe(false);

    hook1.unmount();
    hook2.unmount();
  });
});
