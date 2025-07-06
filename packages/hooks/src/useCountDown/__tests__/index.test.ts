import { act, renderHook } from '@testing-library/react';
import type { Options } from '../index';
import useCountDown from '../index';

const setup = (options: Options = {}) =>
  renderHook((props: Options = options) => useCountDown(props));

describe('useCountDown', () => {
  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    jest.setSystemTime(1479427200000);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

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
    const { result } = setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
    });
    const [count, formattedRes] = result.current;
    expect(count).toBe(5000);
    expect(formattedRes.seconds).toBe(5);
    expect(formattedRes.milliseconds).toBe(0);
  });

  it('should work manually', () => {
    const { result, rerender } = setup({ interval: 100 });

    rerender({ targetDate: Date.now() + 5000, interval: 1000 });
    expect(result.current[0]).toBe(5000);
    expect(result.current[1].seconds).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(4000);
    expect(result.current[1].seconds).toBe(4);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);
  });

  it('should work automatically', () => {
    const { result } = setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
    });

    expect(result.current[0]).toBe(5000);
    expect(result.current[1].seconds).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(4000);
    expect(result.current[1].seconds).toBe(4);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);
  });

  it('should work stop', () => {
    const { result, rerender } = setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
    });

    rerender({
      targetDate: Date.now() + 5000,
      interval: 1000,
    });
    expect(result.current[0]).toBe(5000);
    expect(result.current[1].seconds).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(4000);
    expect(result.current[1].seconds).toBe(4);

    rerender({
      targetDate: undefined,
    });
    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);
  });

  it('it onEnd should work', () => {
    const onEnd = jest.fn();
    setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
      onEnd,
    });
    act(() => {
      jest.advanceTimersByTime(6000);
    });
    expect(onEnd).toBeCalled();
  });

  it('timeLeft should be 0 when target date less than current time', () => {
    const { result } = setup({
      targetDate: Date.now() - 5000,
    });
    expect(result.current[0]).toBe(0);
  });

  it('should initialize correctly with undefined leftTime', () => {
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

  it('should initialize correctly with correct leftTime', () => {
    const { result } = setup({ leftTime: 5 * 1000, interval: 1000 });
    const [count, formattedRes] = result.current;
    expect(count).toBe(5000);
    expect(formattedRes.seconds).toBe(5);
    expect(formattedRes.milliseconds).toBe(0);
  });

  it('should work manually', () => {
    const { result, rerender } = setup({ interval: 100 });

    rerender({ leftTime: 5 * 1000, interval: 1000 });
    expect(result.current[0]).toBe(5000);
    expect(result.current[1].seconds).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(4000);
    expect(result.current[1].seconds).toBe(4);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);
  });

  it('should work automatically', () => {
    const { result } = setup({ leftTime: 5 * 1000, interval: 1000 });

    expect(result.current[0]).toBe(5000);
    expect(result.current[1].seconds).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(4000);
    expect(result.current[1].seconds).toBe(4);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);
  });

  it('should work stop', () => {
    const { result, rerender } = setup({ leftTime: 5 * 1000, interval: 1000 });

    rerender({ leftTime: 5 * 1000, interval: 1000 });
    expect(result.current[0]).toBe(5000);
    expect(result.current[1].seconds).toBe(5);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBe(4000);
    expect(result.current[1].seconds).toBe(4);

    rerender({ leftTime: undefined });
    expect(result.current[0]).toBe(0);
    expect(result.current[1].seconds).toBe(0);
  });

  it('it onEnd should work', () => {
    const onEnd = jest.fn();
    setup({ leftTime: 5 * 1000, interval: 1000, onEnd });
    act(() => {
      jest.advanceTimersByTime(6000);
    });
    expect(onEnd).toBeCalled();
  });

  it('timeLeft should be 0 when leftTime less than current time', () => {
    const { result } = setup({ leftTime: -5 * 1000 });
    expect(result.current[0]).toBe(0);
  });

  it('run with timeLeft should not be reset after targetDate changed', async () => {
    let targetDate = Date.now() + 8000;

    const { result, rerender } = setup({
      leftTime: 6000,
      targetDate,
    });
    expect(result.current[0]).toBe(6000);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    rerender({
      leftTime: 6000,
      targetDate: targetDate,
    });
    expect(result.current[0]).toBe(4000);

    targetDate = Date.now() + 9000;
    rerender({
      leftTime: 6000,
      targetDate: targetDate,
    });
    expect(result.current[0]).toBe(4000);
  });
});
