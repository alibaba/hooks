import { act, renderHook } from '@testing-library/react-hooks';
import useCountDown from '../index';
import type { Options } from '../index';

// https://github.com/facebook/jest/issues/2234
jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000);

const setup = ({
  _leftTime,
  _targetDate,
  _interval,
  onEnd,
}: {
  _leftTime?: Options['leftTime'];
  _targetDate?: Options['targetDate'];
  _interval?: Options['interval'];
  onEnd?: Options['onEnd'];
} = {}) =>
  renderHook(
    ({ leftTime, targetDate, interval }) => useCountDown({ leftTime, targetDate, interval, onEnd }),
    {
      initialProps: {
        leftTime: _leftTime,
        targetDate: _targetDate,
        interval: _interval,
        onEnd,
      },
    },
  );

describe('useCountDown Hooks', () => {
  jest.useFakeTimers();
  it('should initialize correctly with undefined targetDate', () => {
    const { result } = setup();

    const [count, formattedRes] = result.current;

    expect(count).toBe(0);
    expect(formattedRes).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it('should initialize correctly with correct targetDate', () => {
    const { result } = setup({ _targetDate: Date.now() + 5000, _interval: 1000 });

    const [count, formattedRes] = result.current;

    expect(count).toBeLessThanOrEqual(5000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(5);
    expect(formattedRes.milliseconds).toBeLessThanOrEqual(1000);
  });

  it('should work manually', () => {
    const { result } = setup({ _targetDate: undefined, _interval: 1000 });

    const [count, formattedRes] = result.current;

    let targetDate: number;
    let hook;

    act(() => {
      hook = renderHook(() => useCountDown({ targetDate, interval: 1000 }));
    });

    targetDate = Date.now() + 5000;
    hook.rerender();

    expect(count).toBeLessThanOrEqual(5000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(count).toBeLessThanOrEqual(4000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(4);

    jest.advanceTimersByTime(4000);
    expect(count).toEqual(0);
    expect(formattedRes.seconds).toBe(0);

    jest.advanceTimersByTime(1000);
    expect(count).toEqual(0);
    expect(formattedRes.seconds).toBe(0);
  });

  it('should work automatically', async () => {
    const { result } = setup({ _targetDate: Date.now() + 5000, _interval: 1000 });

    const [count, formattedRes] = result.current;

    expect(count).toBeLessThanOrEqual(5000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(count).toBeLessThanOrEqual(4000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(4);

    jest.advanceTimersByTime(4000);
    expect(count).toBeLessThanOrEqual(0);
    expect(formattedRes.seconds).toEqual(0);
  });

  it('should work stop', async () => {
    const { result } = setup({ _targetDate: Date.now() + 5000, _interval: 1000 });

    const [count, formattedRes] = result.current;

    let targetDate = undefined;
    let hook;

    act(() => {
      hook = renderHook(() => useCountDown({ targetDate: Date.now() + 5000, interval: 1000 }));
    });

    expect(count).toBeLessThanOrEqual(5000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(5);

    jest.advanceTimersByTime(1000);
    expect(count).toBeLessThanOrEqual(4000);
    expect(formattedRes.seconds).toBeLessThanOrEqual(4);

    targetDate = undefined;
    hook.rerender();

    expect(count).toBeLessThanOrEqual(0);
    expect(formattedRes.seconds).toEqual(0);
  });

  it('it onEnd should work', async () => {
    let count = 0;
    const onEnd = () => {
      count++;
    };
    setup({ _targetDate: Date.now() + 5000, _interval: 1000, onEnd });
    jest.advanceTimersByTime(6000);
    expect(count).toEqual(1);
  });
});
