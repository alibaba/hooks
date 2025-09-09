import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useInterval(fn, delay, options));

describe('useInterval', () => {
  vi.useFakeTimers();
  vi.spyOn(global, 'clearInterval');

  test('interval should work', () => {
    const callback = vi.fn();
    setUp({ fn: callback, delay: 20 });
    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('interval should stop', () => {
    const callback = vi.fn();

    setUp({ fn: callback, delay: undefined });
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);

    setUp({ fn: callback, delay: -2 });
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('immediate in options should work', () => {
    const callback = vi.fn();
    setUp({ fn: callback, delay: 20, options: { immediate: true } });
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('interval should be clear', () => {
    const callback = vi.fn();
    const hook = setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();

    hook.result.current();
    vi.advanceTimersByTime(70);
    // not to be called
    expect(callback).toHaveBeenCalledTimes(0);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
