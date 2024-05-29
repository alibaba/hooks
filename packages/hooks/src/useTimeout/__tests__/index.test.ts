import { renderHook, act } from '@testing-library/react';
import useTimeout, { type UseTimeoutOptions } from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
  options?: UseTimeoutOptions;
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useTimeout(fn, delay, options));

describe('useTimeout', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'clearTimeout');

  it('timeout should work', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('timeout should stop', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: undefined });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);

    setUp({ fn: callback, delay: -2 });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('timeout should be clear', () => {
    const callback = jest.fn();

    const hook = setUp({ fn: callback, delay: 20 });
    expect(callback).not.toBeCalled();

    hook.result.current.clear();
    jest.advanceTimersByTime(30);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('timeout should not be called if defaultActive is false ', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: 20, options: { defaultActive: false } });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).not.toBeCalled();
    expect(clearTimeout).toHaveBeenCalledTimes(0);
  });

  it('timeout should be called if defaultActive is true ', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: 20, options: { defaultActive: true } });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('timeout should be called if start is called when defaultActive is false ', () => {
    const callback = jest.fn();

    const hook = setUp({ fn: callback, delay: 20, options: { defaultActive: false } });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).not.toBeCalled();

    hook.result.current.start();
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('callback should not be called if called clear after call start', () => {
    const callback = jest.fn();

    const hook = setUp({ fn: callback, delay: 20, options: { defaultActive: false } });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).not.toBeCalled();

    hook.result.current.start();
    jest.advanceTimersByTime(10);
    hook.result.current.clear();
    expect(callback).not.toBeCalled();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('isActive should match setTimeout active state', () => {
    const callback = jest.fn();

    const hook = setUp({ fn: callback, delay: 20, options: { defaultActive: false } });
    expect(hook.result.current.isActive).toBe(false);
    expect(callback).not.toBeCalled();

    act(() => {
      hook.result.current.start();
    });

    expect(hook.result.current.isActive).toBe(true);
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(hook.result.current.isActive).toBe(true);
  });
});
