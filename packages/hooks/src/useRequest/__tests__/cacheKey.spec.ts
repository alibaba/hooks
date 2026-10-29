import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import useRequest, { clearCache } from '..';

afterEach(() => {
  cleanup();
  clearCache();
});

test.each([false, true])(
  'follows the current cache key after a cache hit (strict mode: %s)',
  async (reactStrictMode) => {
    const service = vi.fn(async () => 'unused');
    const options = { manual: true, staleTime: -1, cacheTime: -1 };
    const first = renderHook(() => useRequest(service, { ...options, cacheKey: 'first-entity' }), {
      reactStrictMode,
    });
    const second = renderHook(
      () => useRequest(service, { ...options, cacheKey: 'second-entity' }),
      { reactStrictMode },
    );
    act(() => {
      first.result.current.mutate('first entity');
      second.result.current.mutate('second entity');
    });
    const current = renderHook(({ cacheKey }) => useRequest(service, { ...options, cacheKey }), {
      initialProps: { cacheKey: 'first-entity' },
      reactStrictMode,
    });
    expect(current.result.current.data).toBe('first entity');
    current.rerender({ cacheKey: 'second-entity' });
    await act(async () => {
      await current.result.current.runAsync();
    });
    expect(current.result.current.data).toBe('second entity');
    expect(service).not.toHaveBeenCalled();

    act(() => first.result.current.mutate('first entity updated'));
    expect(current.result.current.data).toBe('second entity');
    act(() => second.result.current.mutate('second entity updated'));
    expect(current.result.current.data).toBe('second entity updated');
  },
);

test('unsubscribes when caching is disabled and subscribes when enabled again', () => {
  const service = vi.fn(async () => 'unused');
  const options = { manual: true, staleTime: -1, cacheTime: -1 };
  const publisher = renderHook(() => useRequest(service, { ...options, cacheKey: 'toggle-cache' }));
  act(() => publisher.result.current.mutate('initial'));
  const current = renderHook(
    ({ cacheKey }: { cacheKey?: string }) => useRequest(service, { ...options, cacheKey }),
    { initialProps: { cacheKey: 'toggle-cache' } as { cacheKey?: string } },
  );
  expect(current.result.current.data).toBe('initial');
  current.rerender({ cacheKey: undefined });
  act(() => publisher.result.current.mutate('disabled update'));
  expect(current.result.current.data).toBe('initial');
  current.rerender({ cacheKey: 'toggle-cache' });
  act(() => publisher.result.current.mutate('enabled update'));
  expect(current.result.current.data).toBe('enabled update');
});

test('keeps other subscribers active after switching keys and unmounting', () => {
  const service = vi.fn(async () => 'unused');
  const options = { manual: true, staleTime: -1, cacheTime: -1 };
  const publisher = renderHook(() => useRequest(service, { ...options, cacheKey: 'shared-cache' }));
  const current = renderHook(({ cacheKey }) => useRequest(service, { ...options, cacheKey }), {
    initialProps: { cacheKey: 'previous-cache' },
  });
  const other = renderHook(() => useRequest(service, { ...options, cacheKey: 'shared-cache' }));
  current.rerender({ cacheKey: 'shared-cache' });
  act(() => current.result.current.mutate('mutated'));
  expect(other.result.current.data).toBe('mutated');
  current.unmount();
  act(() => publisher.result.current.mutate('still subscribed'));
  expect(other.result.current.data).toBe('still subscribed');
});
