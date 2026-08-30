import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest, { CancelledError } from '../index';

describe('useThrottlePlugin', () => {
  vi.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;
  test('useThrottlePlugin should work', () => {
    const callback = vi.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          throttleWait: 100,
        },
      );
    });

    act(() => {
      hook.result.current.run(1);
      vi.advanceTimersByTime(50);
      hook.result.current.run(2);
      vi.advanceTimersByTime(50);
      hook.result.current.run(3);
      vi.advanceTimersByTime(50);
      hook.result.current.run(4);
      vi.advanceTimersByTime(40);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('runAsync should reject a queued call when cancel is called', async () => {
    const service = vi.fn().mockResolvedValue('success');
    const onRejected = vi.fn();

    act(() => {
      hook = setUp(service, {
        manual: true,
        throttleWait: 100,
        throttleLeading: false,
      });
    });
    hook.rerender();

    await act(async () => {
      hook.result.current.runAsync().catch(onRejected);
      hook.result.current.cancel();
      vi.runAllTimers();
    });

    expect(onRejected).toHaveBeenCalledTimes(1);
    expect(onRejected.mock.calls[0][0]).toBeInstanceOf(CancelledError);
    expect(service).not.toHaveBeenCalled();
    hook.unmount();
  });

  test('runAsync should reject a queued call when it is superseded', async () => {
    const service = vi.fn((value: string) => Promise.resolve(value));
    const onFirstRejected = vi.fn();
    const onSecondFulfilled = vi.fn();

    act(() => {
      hook = setUp(service, {
        manual: true,
        throttleWait: 100,
        throttleLeading: false,
      });
    });
    hook.rerender();

    await act(async () => {
      hook.result.current.runAsync('first').catch(onFirstRejected);
      hook.result.current.runAsync('second').then(onSecondFulfilled);
      vi.runAllTimers();
    });

    expect(onFirstRejected).toHaveBeenCalledTimes(1);
    expect(onFirstRejected.mock.calls[0][0]).toBeInstanceOf(CancelledError);
    expect(service).toHaveBeenCalledTimes(1);
    expect(service).toHaveBeenCalledWith('second');
    expect(onSecondFulfilled).toHaveBeenCalledWith('second');
    hook.unmount();
  });

  test('runAsync should reject a call suppressed when trailing is false', async () => {
    const service = vi.fn((value: string) => Promise.resolve(value));

    act(() => {
      hook = setUp(service, {
        manual: true,
        throttleWait: 100,
        throttleTrailing: false,
      });
    });
    hook.rerender();

    await act(async () => {
      await expect(hook.result.current.runAsync('first')).resolves.toBe('first');
      await expect(hook.result.current.runAsync('dropped')).rejects.toBeInstanceOf(CancelledError);
      vi.advanceTimersByTime(100);
    });

    expect(service).toHaveBeenCalledTimes(1);
    hook.unmount();
  });
});
