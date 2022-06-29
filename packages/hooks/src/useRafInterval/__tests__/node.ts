import { renderHook } from '@testing-library/react-hooks';
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
    jest.useFakeTimers('modern');
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should downgrade to setInterval when requstAnimationFrame is undefined', () => {
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
