import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useRequest, { CancelledError } from '../index';

describe('throttled requests with ready', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  test('does not queue calls made while ready is false', async () => {
    const service = vi.fn().mockResolvedValue('result');
    const hook = renderHook(
      ({ ready }) =>
        useRequest(service, { manual: true, ready, throttleWait: 100, throttleLeading: false }),
      { initialProps: { ready: false } },
    );
    const promise = hook.result.current.runAsync();

    hook.rerender({ ready: true });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(service).not.toHaveBeenCalled();
    await expect(promise).resolves.toBeUndefined();
  });

  test('cancels a queued call when ready becomes false', async () => {
    const service = vi.fn((value: string) => Promise.resolve(value));
    const hook = renderHook(
      ({ ready }) =>
        useRequest(service, { manual: true, ready, throttleWait: 100, throttleLeading: false }),
      { initialProps: { ready: true } },
    );
    const outcome = hook.result.current.runAsync('stale').catch((error: unknown) => error);

    hook.rerender({ ready: false });
    hook.rerender({ ready: true });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(service).not.toHaveBeenCalled();
    await expect(outcome).resolves.toBeInstanceOf(CancelledError);

    await act(async () => {
      const promise = hook.result.current.runAsync('current');
      await vi.advanceTimersByTimeAsync(100);
      await expect(promise).resolves.toBe('current');
    });
    expect(service).toHaveBeenCalledExactlyOnceWith('current');
  });
});
