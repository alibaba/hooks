/* eslint-disable no-global-assign, no-restricted-globals */
import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useUrlState from '../index';
import routeData from 'react-router';

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

    function setup(key: string, value: string) {
      hook = renderHook(() => {
        return useUrlState({ [key]: value });
      }) as any;
      hook.rerender();
    }

    const replaceFn = jest.fn();

    const mockLocation = {
      pathname: '/',
      hash: '',
      search: '',
      state: '',
    };

    const mockHistory: any = {
      push: ({ search }) => {
        replaceFn();
        mockLocation.search = search;
      },
    };

    beforeEach(() => {
      jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
      jest.spyOn(routeData, 'useHistory').mockReturnValue(mockHistory);
    });

    afterEach(() => {
      hook.unmount();
    });

    it('history replace should work', async () => {
      act(() => {
        setup('mock', '0');
      });
      expect(replaceFn).toBeCalledTimes(0);
      expect(hook.result.current[0]).toEqual({ mock: '0' });
      expect(mockLocation.search).toEqual('');
      act(() => {
        hook.result.current[1]({ mock: 1 });
      });
      expect(replaceFn).toBeCalledTimes(1);
      expect(mockLocation.search).toEqual('mock=1');
      act(() => {
        hook.result.current[1]({ mock: 2, test: 3 });
      });
      expect(mockLocation.search).toEqual('mock=2&test=3');
    });
  });
});
