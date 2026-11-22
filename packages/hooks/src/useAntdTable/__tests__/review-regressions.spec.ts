import { act, cleanup, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import useAntdTable from '..';
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
test('only the current StrictMode effect starts its initial request', async () => {
  vi.useFakeTimers();
  const service = vi.fn(async () => ({ total: 0, list: [] }));
  renderHook(() => useAntdTable(service), { wrapper: StrictMode });
  await act(async () => {
    await vi.runAllTimersAsync();
  });
  expect(service).toHaveBeenCalledTimes(1);
});
