import { renderHook } from '@testing-library/react-hooks';
import useTimeout from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number;
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useTimeout(fn, delay));

describe('useTimeout', () => {
  jest.useFakeTimers();
  it('should be defined', () => {
    expect(useTimeout).toBeDefined();
  });

  it('timeout should work', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
