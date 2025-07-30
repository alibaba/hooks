import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useTimeout from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay?: number;
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useTimeout(fn, delay));

describe('useTimeout', () => {
  vi.useFakeTimers();
  vi.spyOn(global, 'clearTimeout');

  test('timeout should work', () => {
    const callback = vi.fn();

    setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('timeout should stop', () => {
    const callback = vi.fn();

    setUp({ fn: callback, delay: undefined });
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);

    setUp({ fn: callback, delay: -2 });
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('timeout should be clear', () => {
    const callback = vi.fn();

    const hook = setUp({ fn: callback, delay: 20 });
    expect(callback).not.toBeCalled();

    hook.result.current();
    vi.advanceTimersByTime(30);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
