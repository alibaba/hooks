import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useInterval(fn, delay, options));

describe('useInterval', () => {
  let clearIntervalSpy: any;

  beforeEach(() => {
    vi.useFakeTimers();
    clearIntervalSpy = vi.spyOn(global, 'clearInterval');
  });

  afterEach(() => {
    vi.useRealTimers();
    clearIntervalSpy.mockRestore();
  });

  test('interval should work', () => {
    const callback = vi.fn();
    setUp({ fn: callback, delay: 20 });
    expect(callback).not.toHaveBeenCalled();
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
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('interval should be clear', () => {
    const callback = vi.fn();
    const hook = setUp({ fn: callback, delay: 20 });

    expect(callback).not.toHaveBeenCalled();

    hook.result.current();
    vi.advanceTimersByTime(70);
    // not to be called
    expect(callback).toHaveBeenCalledTimes(0);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
