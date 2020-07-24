/* eslint-disable no-global-assign, no-restricted-globals */
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useUrlState from '../index';

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

describe('useUrlState', () => {
  it('should be defined', () => {
    expect(useUrlState).toBeDefined();
  });

  describe('test url', () => {
    let hook: RenderHookResult<
      [string, number],
      [number, ((s: any) => void) | (() => (s: any) => any)]
    >;

    function setup(key: string, value: number) {
      hook = renderHook(() => {
        return useUrlState({ [key]: value }, { historyType: 'hash' });
      }) as any;
      hook.rerender();
    }

    beforeEach(() => {
      history.replaceState({}, 'test', 'http://localhost/#/world');
    });

    afterEach(() => {
      hook.unmount();
    });

    it('hash history url should work', async () => {
      act(() => {
        setup('mock', 0);
      });
      // 使用默认值，不会带到 query 中
      expect(global.location.hash).toBe('#/world');
      expect(hook.result.current[0]).toEqual({ mock: 0 });
      act(() => {
        hook.result.current[1]({ mock: 1 });
      });
      expect(global.location.hash).toBe('#/world?mock=1');
      expect(hook.result.current[0]).toEqual({ mock: 1 });
      act(() => {
        setup('anotherName', 0);
      });
      expect(global.location.hash).toBe('#/world?mock=1');
      expect(hook.result.current[0]).toEqual({ mock: 1, anotherName: 0 });
      act(() => {
        hook.result.current[1]({ anotherName: true });
      });
      expect(global.location.hash).toBe('#/world?anotherName=true&mock=1');
    });
  });
});
