import { renderHook } from '@testing-library/react-hooks';
import useAsyncInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number;
  options?: { immediate: boolean };
}

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
};

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useAsyncInterval(fn, delay));

describe('useAsyncInterval', () => {
  jest.useFakeTimers();
  it('should be defined', () => {
    expect(useAsyncInterval).toBeDefined();
  });

  it('interval should work', () => {
    const callback = jest.fn().mockImplementation(async () => {
      await wait(30);
    });

    setUp({ fn: callback, delay: 20 });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
