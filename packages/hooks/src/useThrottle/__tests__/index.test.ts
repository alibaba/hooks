import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useThrottle from '../index';

interface ParamsObj {
  value: any;
  wait: number;
}

/* 暂时关闭 act 警告  见：https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256 */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

let hook: RenderHookResult<ParamsObj, any>;

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('useThrottle should work', () => {
    let mountedState = 1;
    act(() => {
      hook = renderHook(() => useThrottle(mountedState, 500));
    });
    act(() => {
      expect(hook.result.current).toEqual(1);
      mountedState = 2;
      hook.rerender();
      mountedState = 3;
      hook.rerender();
      jest.advanceTimersByTime(250);
      expect(hook.result.current).toEqual(1);
      mountedState = 4;
      hook.rerender();
      jest.advanceTimersByTime(260);
      expect(hook.result.current).toEqual(4);
    });
  });
});
