import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

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

  test('useThrottlePlugin should work with runAsync', () => {
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
      hook.result.current.runAsync(1);
      vi.advanceTimersByTime(50);
      hook.result.current.runAsync(2);
      vi.advanceTimersByTime(50);
      hook.result.current.runAsync(3);
      vi.advanceTimersByTime(50);
      hook.result.current.runAsync(4);
      vi.advanceTimersByTime(40);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('useThrottlePlugin should respect throttleLeading and throttleTrailing options with runAsync', () => {
    const callback = vi.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          throttleWait: 3000,
          throttleLeading: true,
          throttleTrailing: false,
        },
      );
    });

    act(() => {
      // First call should execute immediately (leading: true)
      hook.result.current.runAsync(1);
      // These calls should be ignored (within throttle window)
      hook.result.current.runAsync(2);
      hook.result.current.runAsync(3);
      hook.result.current.runAsync(4);
      hook.result.current.runAsync(5);
      hook.result.current.runAsync(6);
      hook.result.current.runAsync(7);

      vi.advanceTimersByTime(3000);

      // After throttle window, next call should execute
      hook.result.current.runAsync(8);
    });

    // Should only execute twice: first call (leading) and call after throttle window
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
