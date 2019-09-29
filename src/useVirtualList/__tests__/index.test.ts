import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';
import { DependencyList } from 'react';
import useVirtualList, { OptionType } from '../index';

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

describe('useVirtualList', () => {
  it('should be defined', () => {
    expect(useVirtualList).toBeDefined();
  });

  describe('virtual list render', () => {
    const mockRef = { scrollTop: 0, clientHeight: 300 };
    let hook: RenderHookResult<
      { list: unknown[]; options: OptionType },
      {
        list: unknown[];
        scrollTo: (index: number) => void;
        containerProps: () => {
          ref: (ref: any) => void;
        };
        wrapperProps: () => {};
      }
    >;

    const setup = (list: any[] = [], options: {}) => {
      hook = renderHook(() => useVirtualList(list as unknown[], options as OptionType));
      hook.result.current.containerProps().ref(mockRef);
    };

    afterEach(() => {
      hook.unmount();
    });

    it('test return list size', () => {
      setup(Array.from(Array(99999).keys()), {});

      act(() => {
        hook.result.current.scrollTo(80);
      });

      expect(hook.result.current.list.length).toBe(20);
      expect(mockRef.scrollTop).toBe(80 * 30);

      console.log(hook.result.current.list, mockRef);
    });
  });
});
