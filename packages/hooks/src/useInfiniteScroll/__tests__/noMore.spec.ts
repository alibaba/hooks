import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import useInfiniteScroll from '..';

afterEach(cleanup);

test('resumes pagination when an externally supplied total increases', async () => {
  const service = vi.fn(async () => ({ list: ['item'] }));
  const { result, rerender } = renderHook(
    ({ total }) =>
      useInfiniteScroll(service, {
        manual: true,
        isNoMore: (data) => (data?.list.length ?? 0) >= total,
      }),
    { initialProps: { total: 1 } },
  );
  await act(async () => {
    await result.current.reloadAsync();
  });
  expect(result.current.noMore).toBe(true);
  rerender({ total: 2 });
  expect(result.current.noMore).toBe(false);
  await act(async () => {
    result.current.loadMore();
  });
  expect(service).toHaveBeenCalledTimes(2);
  expect(result.current.data?.list).toHaveLength(2);
});

test('stops pagination when an externally supplied total decreases', async () => {
  const service = vi.fn(async () => ({ list: ['item'] }));
  const { result, rerender } = renderHook(
    ({ total }) =>
      useInfiniteScroll(service, {
        manual: true,
        isNoMore: (data) => (data?.list.length ?? 0) >= total,
      }),
    { initialProps: { total: 10 } },
  );
  await act(async () => {
    await result.current.reloadAsync();
  });
  expect(result.current.noMore).toBe(false);
  rerender({ total: 1 });
  expect(result.current.noMore).toBe(true);
  await act(async () => {
    result.current.loadMore();
  });
  expect(service).toHaveBeenCalledTimes(1);
});

test('recomputes noMore when the predicate is added or removed', () => {
  const service = vi.fn(async () => ({ list: ['item'] }));
  const { result, rerender } = renderHook(
    ({ isNoMore }: { isNoMore?: () => boolean }) =>
      useInfiniteScroll(service, { manual: true, isNoMore }),
    { initialProps: { isNoMore: undefined } as { isNoMore?: () => boolean } },
  );
  expect(result.current.noMore).toBe(false);
  rerender({ isNoMore: () => true });
  expect(result.current.noMore).toBe(true);
  rerender({ isNoMore: undefined });
  expect(result.current.noMore).toBe(false);
  expect(service).not.toHaveBeenCalled();
});
