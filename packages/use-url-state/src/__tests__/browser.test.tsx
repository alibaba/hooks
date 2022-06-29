import type { RenderHookResult } from '@testing-library/react-hooks';
import { act, renderHook } from '@testing-library/react-hooks';
import routeData from 'react-router';
import useUrlState, { Options } from '../index';

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
const replaceFn = jest.fn();

function makeMockLocation(search?: string) {
  const mockLocation = {
    pathname: '/',
    hash: '',
    search: search ? `${search}` : '',
    state: '',
  };

  const mockHistory: any = {
    push: ({ search }) => {
      replaceFn();
      mockLocation.search = search;
    },
  };

  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
  jest.spyOn(routeData, 'useHistory').mockReturnValue(mockHistory);

  return mockLocation;
}

describe('useUrlState', () => {
  it('should be defined', () => {
    expect(useUrlState).toBeDefined();
  });

  describe('test url', () => {
    let hook: RenderHookResult<
      [string, number],
      [number, ((s: any) => void) | (() => (s: any) => any)]
    >;

    function setup(key: string, value: string, config?: Options) {
      hook = renderHook(() => {
        return useUrlState({ [key]: value }, config);
      }) as any;
      hook.rerender();
    }

    afterEach(() => {
      hook.unmount();
    });

    it('history replace should work', async () => {
      const mockLocation = makeMockLocation();
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

    it('query-string options should work', async () => {
      const mockLocation = makeMockLocation();

      act(() => {
        setup('mock', '0', {
          parseOptions: {
            arrayFormat: 'comma',
          },
          stringifyOptions: {
            arrayFormat: 'comma',
          },
        });
      });
      expect(replaceFn).toBeCalledTimes(0);
      expect(hook.result.current[0]).toEqual({ mock: '0' });
      expect(mockLocation.search).toEqual('');

      act(() => {
        hook.result.current[1]({ mock: 1, test: [1, 2, 3] });
      });
      expect(replaceFn).toBeCalledTimes(1);
      expect(hook.result.current[0]).toEqual({ mock: '1', test: ['1', '2', '3'] });
      expect(mockLocation.search).toEqual('mock=1&test=1,2,3');
    });
  });
});
