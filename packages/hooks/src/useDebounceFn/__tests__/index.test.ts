import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useDebounceFn, { ReturnValue } from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  deps?: any[];
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

let count = 0;
const debounceFn = (gap: number) => {
  count += gap;
};

const setUp = ({ fn, wait }: ParamsObj) => renderHook(() => useDebounceFn(fn, wait));

let hook: RenderHookResult<ParamsObj, ReturnValue>;

describe('useDebounceFn', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('should be defined', () => {
    expect(useDebounceFn).toBeDefined();
  });

  it('run and cancel should work', () => {
    act(() => {
      hook = setUp({
        fn: debounceFn,
        wait: 500,
      });
    });
    act(() => {
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      jest.runAllTimers();
      expect(count).toBe(2);
      hook.result.current.run(4);
      jest.runAllTimers();
      expect(count).toBe(6);
      hook.result.current.run(4);
      hook.result.current.cancel();
      jest.runAllTimers();
      expect(count).toBe(6);
    });
  });

  it('deps should work', () => {
    let c = 0;
    let mountedState = 1;
    act(() => {
      hook = renderHook(() =>
        useDebounceFn(
          () => {
            c += 1;
          },
          [mountedState],
          500,
        ),
      );
    });
    act(() => {
      expect(c).toEqual(0);
      mountedState = 2;
      hook.rerender();
      mountedState = 3;
      hook.rerender();
      jest.runAllTimers();
      expect(c).toEqual(1);
      mountedState = 4;
      hook.rerender();
      expect(c).toEqual(1);
      jest.runAllTimers();
      expect(c).toEqual(2);
    });
  });
});
