import { renderHook } from '@testing-library/react-hooks';
import useRafTimeout from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useRafTimeout(fn, delay));

const FRAME_TIME = 16.7;
describe('useRafTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should be defined', () => {
    expect(useRafTimeout).toBeDefined();
  });

  it('timeout should work', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(FRAME_TIME * 2.5);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('timeout should stop when delay is undefined', () => {
    const delay: number | undefined = undefined;
    const callback = jest.fn();
    setUp({ fn: callback, delay });
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).not.toBeCalled();
  });
});
