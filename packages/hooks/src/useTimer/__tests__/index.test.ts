import { act, renderHook } from '@testing-library/react';
import useTimer from '../index';

describe('useTimer', () => {
  let callback;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    callback.mockRestore();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('test countdown', async () => {
    const hook = renderHook(() =>
      useTimer<number>(3, {
        onComplete: callback,
        auto: false,
      }),
    );

    jest.advanceTimersByTime(2999);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(10);
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      hook.result.current.start();
    });
    act(() => {
      Promise.resolve(jest.advanceTimersByTime(3000));
    });
    expect(callback).toHaveBeenCalled();
    expect(Number(hook.result.current.remainingTime)).toBeFalsy();
    expect(Number(hook.result.current.seconds)).toBeFalsy();
    expect(Number(hook.result.current.minutes)).toBeFalsy();
    expect(Number(hook.result.current.hours)).toBeFalsy();
    expect(Number(hook.result.current.days)).toBeFalsy();
  });

  it('test from pass', () => {
    const hook = renderHook(() => useTimer<number>(new Date('1999, 4, 4')));
    expect(hook.result.current.remainingTime).toBeTruthy();
    expect(hook.result.current.seconds).toBeDefined();
    expect(hook.result.current.minutes).toBeDefined();
    expect(hook.result.current.hours).toBeDefined();
    expect(hook.result.current.days).toBeDefined();
  });

  it('test from future', () => {
    const hook = renderHook(() => useTimer<number>(new Date('2028-07-14')));
    expect(hook.result.current.remainingTime).toBeTruthy();
    expect(hook.result.current.seconds).toBeDefined();
    expect(hook.result.current.minutes).toBeDefined();
    expect(hook.result.current.hours).toBeDefined();
    expect(hook.result.current.days).toBeDefined();
  });
});
