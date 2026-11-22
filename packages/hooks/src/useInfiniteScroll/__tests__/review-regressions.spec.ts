import { act, renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import useMemoizedFn from '../../useMemoizedFn';
import useInfiniteScroll from '..';
test('recomputes noMore for a stable predicate with fresh captured values', async () => {
  const service = vi.fn(async () => ({ list: ['item'] }));
  const { result, rerender } = renderHook(
    ({ total }) => {
      const isNoMore = useMemoizedFn(
        (data?: { list: string[] }) => (data?.list.length ?? 0) >= total,
      );
      return useInfiniteScroll(service, { manual: true, isNoMore });
    },
    { initialProps: { total: 1 } },
  );
  await act(async () => {
    await result.current.reloadAsync();
  });
  expect(result.current.noMore).toBe(true);
  rerender({ total: 2 });
  expect(result.current.noMore).toBe(false);
});
