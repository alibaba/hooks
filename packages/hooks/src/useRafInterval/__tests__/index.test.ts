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
  it('should be defined', () => {
    expect(useRafInterval).toBeDefined();
  });

  it('interval should work', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(FRAME_TIME * 2.5);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('delay is undefined should stop', () => {
    const delay: number | undefined = undefined;
    const callback = jest.fn();
    setUp({ fn: callback, delay });
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).not.toBeCalled();
  });

  it('immediate in options should work', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: FRAME_TIME, options: { immediate: true } });
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
