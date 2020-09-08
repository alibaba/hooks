import { act, renderHook } from '@testing-library/react-hooks';
import MockDate from 'mockdate';
import useTimer from '../index';

describe('useTimer', () => {
  it('useTimer should be defined', () => {
    expect(useTimer).toBeDefined();
  });

  const result = renderHook(() => useTimer({ updateRate: 100 })).result;

  it('should init countdown', () => {
    const [remaining, { start, pause, cont, reset }] = result.current;
    expect(remaining).toBe(0);
    expect(start).toBeDefined();
    expect(pause).toBeDefined();
    expect(cont).toBeDefined();
    expect(reset).toBeDefined();
  });

  it('run', async () => {
    jest.useFakeTimers();
    const [remaining, { start, pause, cont, reset }] = result.current;

    MockDate.set(0);
    act(() => {
      start(1000);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      MockDate.set(100);
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(100);

    act(() => {
      MockDate.set(200);
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(200);

    act(() => {
      pause();
      MockDate.set(300);
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(200);

    act(() => {
      result.current[1].cont();
      MockDate.set(400);
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(300);

    act(() => {
      reset();
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      MockDate.set(500);
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      start(100);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      MockDate.set(700);
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe(100);
  });
});
