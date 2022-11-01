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
  jest.useFakeTimers();
  jest.spyOn(global, 'clearInterval');

  it('interval should work', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: 20 });
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('interval should stop', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: undefined });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);

    setUp({ fn: callback, delay: -2 });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('immediate in options should work', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: 20, options: { immediate: true } });
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('interval should be clear', () => {
    const callback = jest.fn();
    const hook = setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();

    hook.result.current();
    jest.advanceTimersByTime(70);
    // not to be called
    expect(callback).toHaveBeenCalledTimes(0);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
