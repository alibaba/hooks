import { renderHook } from '@testing-library/react';
import useRafTimeout from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useRafTimeout(fn, delay));

const FRAME_TIME = 16.7;
describe('useRafTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: false });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should downgrade to setTimeout when requstAnimationFrame is undefined', () => {
    const _requestAnimationFrame = global.requestAnimationFrame;
    const _cancelAnimationFrame = global.cancelAnimationFrame;

    // @ts-ignore
    delete global.requestAnimationFrame;
    // @ts-ignore
    delete global.cancelAnimationFrame;

    const callback = jest.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).toHaveBeenCalledTimes(1);

    global.requestAnimationFrame = _requestAnimationFrame;
    global.cancelAnimationFrame = _cancelAnimationFrame;
  });
});
