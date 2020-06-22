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
      [number, ((s: number) => void) | (() => (s: number) => number)]
    >;

    function setup(key: string, value: number) {
      hook = renderHook(() => {
        return useUrlState.call(this, key, value);
      }) as any;
      hook.rerender();
    }

    afterEach(() => {
      hook.unmount();
    });

    it('hash history url should work', () => {
      location.hash = '#/mock/hash/history';
      location.search = '';
      location.href = 'http://localhost/#/mock/hash/history';
      history.replaceState = (s, t, url) => {
        location.href = url;
      };
      act(() => {
        setup.call({}, 'test', ['1', '2']);
      });
      expect(location.hash).toBe('#/mock/hash/history?test=1&test=2');
    });
  });
});
