import { renderHook } from '@testing-library/react-hooks';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useInterval(fn, delay, options));

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

  it('interval should stop', () => {
    const callback = jest.fn();
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

    setUp({ fn: callback, delay: undefined });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenLastCalledWith(
      'delay should be a valid number but get undefined',
    );

    setUp({ fn: callback, delay: -2 });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenLastCalledWith('delay should be a valid number but get -2');

    setUp({ fn: callback, delay: NaN });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenLastCalledWith('delay should be a valid number but get NaN');
  });

  it('immediate in options should work', () => {
    const callback = jest.fn();
    setUp({ fn: callback, delay: 20, options: { immediate: true } });
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
