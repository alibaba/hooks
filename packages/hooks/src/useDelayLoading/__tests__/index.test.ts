import { renderHook, act } from '@testing-library/react-hooks';
import useDelayLoading from '../index';
jest.useFakeTimers();

const setUp = (initValue: boolean, lazy?: number) =>
  renderHook(() => useDelayLoading(initValue, lazy));

describe('useDelayLoading', () => {
  it('should be defined', () => {
    expect(useDelayLoading).toBeDefined();
  });

  /** 测试初始值为false，在延迟时间200ms内设置为true, 期望loading值依然为false */
  it('test on delay time internal set true', async () => {
    const { result } = setUp(false, 200);
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe(false);
  });

  /** 测试初始值为false，在超出延迟时间200ms后设置为true, 期望loading值变为true */
  it('test on delay time external set true', () => {
    const { result } = setUp(false, 200);
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
      jest.advanceTimersByTime(300);
    });
    expect(result.current[0]).toBe(true);
  });

  it('test on default value', () => {
    const hook = setUp(true);
    expect(hook.result.current[0]).toBe(true);
  });
});
