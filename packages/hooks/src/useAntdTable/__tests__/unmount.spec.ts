import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import useAntdTable from '..';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
});

test('does not start a deferred search after the table unmounts', async () => {
  const service = vi.fn(async () => ({ total: 1, list: ['result'] }));
  const hook = renderHook(() => useAntdTable(service, { manual: true }));
  act(() => hook.result.current.search.submit());
  hook.unmount();
  await act(async () => {
    await vi.runAllTimersAsync();
  });
  expect(service).not.toHaveBeenCalled();
});

test('does not restart polling after its deferred search is unmounted', async () => {
  const service = vi.fn(async () => ({ total: 1, list: ['result'] }));
  const hook = renderHook(() => useAntdTable(service, { manual: true, pollingInterval: 100 }));
  act(() => hook.result.current.search.submit());
  hook.unmount();
  await act(async () => {
    await vi.advanceTimersByTimeAsync(350);
  });
  expect(service).not.toHaveBeenCalled();
});

test('does not start a search when async validation finishes after unmount', async () => {
  let resolveValidation!: (value: Record<string, string>) => void;
  const validation = new Promise<Record<string, string>>((resolve) => {
    resolveValidation = resolve;
  });
  const form = {
    getInternalHooks: () => ({}),
    getFieldsValue: () => ({ keyword: 'old page' }),
    setFieldsValue: vi.fn(),
    resetFields: vi.fn(),
    validateFields: vi.fn(() => validation),
  };
  const service = vi.fn(async () => ({ total: 1, list: ['result'] }));
  const onSuccess = vi.fn();
  const hook = renderHook(() => useAntdTable(service, { manual: true, form, onSuccess }));
  act(() => hook.result.current.search.submit());
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  expect(form.validateFields).toHaveBeenCalledTimes(1);
  hook.unmount();
  await act(async () => {
    resolveValidation({ keyword: 'old page' });
  });
  expect(service).not.toHaveBeenCalled();
  expect(onSuccess).not.toHaveBeenCalled();
});

test('does not run the initial search after immediate unmount', async () => {
  const service = vi.fn(async () => ({ total: 1, list: ['result'] }));
  const hook = renderHook(() => useAntdTable(service));
  hook.unmount();
  await act(async () => {
    await vi.runAllTimersAsync();
  });
  expect(service).not.toHaveBeenCalled();
});
