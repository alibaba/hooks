import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

describe('useDebouncePlugin', () => {
  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;

  test('useDebouncePlugin should work', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          debounceWait: 100,
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
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      hook.result.current.run(1);
      vi.advanceTimersByTime(50);
      hook.result.current.run(2);
      vi.advanceTimersByTime(50);
      hook.result.current.run(3);
      vi.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      hook.result.current.run(1);
      vi.advanceTimersByTime(50);
      hook.result.current.run(2);
      vi.advanceTimersByTime(50);
      hook.result.current.cancel();
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });

  test('useDebouncePlugin should bypass debounce when ready is false', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          ready: true,
          debounceWait: 100,
          debounceLeading: true,
        },
      );
    });

    expect(callback).toHaveBeenCalledTimes(1);

    hook.rerender({
      ready: false,
      debounceWait: 100,
      debounceLeading: true,
    });

    act(() => {
      hook.result.current.run();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    hook.rerender({
      ready: true,
      debounceWait: 100,
      debounceLeading: true,
    });

    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });
});
