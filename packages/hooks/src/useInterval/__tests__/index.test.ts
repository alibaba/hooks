import { renderHook } from '@testing-library/react-hooks';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number;
  options?: { immediate?: boolean; iterate?: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useInterval(fn, delay, options));
let hook;

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

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

  it('iterate mode should work', async () => {
    const callback = jest.fn(async () => wait(30));
    setUp({ fn: callback, delay: 20, options: { iterate: true } });

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
