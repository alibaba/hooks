import { renderHook } from '@testing-library/react-hooks';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useInterval(fn, delay));

describe('useInterval', () => {
  jest.useFakeTimers();
  it('should be defined', () => {
    expect(useInterval).toBeDefined();
  });

  it('interval should work', () => {
    const callback = jest.fn();

    setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
