import { act, renderHook } from '@testing-library/react-hooks';
import useCountDown, { TDate, Options } from '../index';

// https://github.com/facebook/jest/issues/2234
jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);

const init = (_targetDate?: TDate, _interval?: Options['interval'], onEnd?: Options['onEnd']) =>
  renderHook(({ targetDate, interval }) => useCountDown({ targetDate, interval, onEnd }), {
    initialProps: {
      targetDate: _targetDate,
      interval: _interval,
      onEnd,
    },
  });

describe('useCountDown Hooks', () => {
  jest.useFakeTimers();
  it('should initialize correctly with undefined targetDate', () => {
    const { result } = init();

    const [count, invoker, formattedRes] = result.current;

    expect(count).toBe(0);
    expect(typeof invoker).toBe('function');
    expect(formattedRes).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it('should initialize correctly with correct targetDate', () => {
    const { result } = init(Date.now() + 5000, 1000);

    const [count, invoker, formattedRes] = result.current;

    expect(count).toBeLessThanOrEqual(5000);
    expect(typeof invoker).toBe('function');
    expect(formattedRes.seconds).toBeLessThanOrEqual(5);
    expect(formattedRes.milliseconds).toBeLessThanOrEqual(1000);
  });

  it('should work manually', () => {
    const { result } = init(undefined, 1000);

    act(() => {
      result.current[1](Date.now() + 5000);
    });

    expect(result.current[0]).toBeLessThanOrEqual(5000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toBeLessThanOrEqual(4000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(4);

    jest.advanceTimersByTime(4000);
    expect(result.current[0]).toEqual(0);
    expect(result.current[2].seconds).toBe(0);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toEqual(0);
    expect(result.current[2].seconds).toBe(0);
  });

  it('should work automatically', async () => {
    const { result } = init(Date.now() + 5000, 1000);

    expect(result.current[0]).toBeLessThanOrEqual(5000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toBeLessThanOrEqual(4000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(4);

    jest.advanceTimersByTime(4000);
    expect(result.current[0]).toBeLessThanOrEqual(0);
    expect(result.current[2].seconds).toEqual(0);
  });

  it('should work stop', async () => {
    const { result } = init(Date.now() + 5000, 1000);

    expect(result.current[0]).toBeLessThanOrEqual(5000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toBeLessThanOrEqual(4000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(4);

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBeLessThanOrEqual(0);
    expect(result.current[2].seconds).toEqual(0);
  });

  it('it onEnd should work', async () => {
    let count = 0;
    const onEnd = () => {
      count++;
    };
    init(Date.now() + 5000, 1000, onEnd);
    jest.advanceTimersByTime(6000);
    expect(count).toEqual(1);
  });
});
