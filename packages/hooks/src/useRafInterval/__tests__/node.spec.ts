import { renderHook } from '@testing-library/react';
import { beforeAll, afterAll, describe, test, expect, vi } from 'vitest';
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
  test('should downgrade to setInterval when requstAnimationFrame is undefined', () => {
    Object.defineProperty(window, 'cancelAnimationFrame', { value: undefined });
    Object.defineProperty(window, 'requestAnimationFrame', { value: undefined });

    const callback = vi.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
