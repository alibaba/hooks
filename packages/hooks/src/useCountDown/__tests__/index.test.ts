import { act, renderHook } from '@testing-library/react-hooks';
import useCountDown, { TDate, FormattedRes, TOpts } from '../index';

const init = (
  _targetDate?: TDate,
  _interval?: TOpts['intervalTime'],
  _formatter?: TOpts['formatter'],
) =>
  renderHook(
    ({ targetDate, interval, formatter }) =>
      useCountDown(targetDate, { intervalTime: interval, formatter }),
    {
      initialProps: {
        targetDate: _targetDate,
        interval: _interval,
        formatter: _formatter,
      },
    },
  );

describe('useCountDown Hooks', () => {
  jest.useFakeTimers();
  it('should initialize correctly with undefined targetDate', () => {
    const { result } = init(undefined, 1000);

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

    expect(result.current[0]).toBeLessThanOrEqual(5010);
    expect(result.current[2].seconds).toBe(5);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toBeLessThanOrEqual(4010);
    expect(result.current[2].seconds).toBe(4);

    jest.advanceTimersByTime(4000);
    expect(result.current[0]).toBeLessThanOrEqual(10);
    expect(result.current[2].seconds).toBe(0);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toBeLessThanOrEqual(0);
    expect(result.current[2].seconds).toBe(0);
  });

  it('should work automatically', () => {
    const { result } = init(Date.now() + 5000, 1000);

    expect(result.current[0]).toBeLessThanOrEqual(5000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(result.current[0]).toBeLessThanOrEqual(4000);
    expect(result.current[2].seconds).toBeLessThanOrEqual(4);

    jest.advanceTimersByTime(4000);
    expect(result.current[0]).toBeLessThanOrEqual(0);
    expect(result.current[2].seconds).toBeLessThanOrEqual(0);
  });
});
