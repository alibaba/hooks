import { renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import useRafInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useRafInterval(fn, delay, options));

const FRAME_TIME = 16;
describe('useRafInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('interval should work', () => {
    const callback = vi.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(FRAME_TIME * 2.5);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('delay is undefined should stop', () => {
    const delay: number | undefined = undefined;
    const callback = vi.fn();
    setUp({ fn: callback, delay });
    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).not.toBeCalled();
  });

  test('immediate in options should work', () => {
    const callback = vi.fn();
    setUp({ fn: callback, delay: FRAME_TIME, options: { immediate: true } });
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('interval should be clear', () => {
    const callback = vi.fn();
    const hook = setUp({ fn: callback, delay: FRAME_TIME });

    expect(callback).not.toBeCalled();

    hook.result.current();
    vi.advanceTimersByTime(FRAME_TIME * 2.5);
    // not to be called
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
