import { act, renderHook } from '@testing-library/react-hooks';
import useVirtualList, { Options } from '../index';

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
    let hook: any;
    let container: HTMLDivElement;
    let wrapper: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');

      // mock clientheight, clientWidth
      // see: https://github.com/testing-library/react-testing-library/issues/353

      jest.spyOn(container, 'clientHeight', 'get').mockImplementation(() => 300);
      jest.spyOn(container, 'clientWidth', 'get').mockImplementation(() => 300);

      wrapper = document.createElement('div');
      container.appendChild(wrapper);

      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
      hook.unmount();
    });

    const setup = (list: any[] = [], options: {}) => {
      hook = renderHook(() => useVirtualList(list as unknown[], options as Options<any>));
    };

    it('test return list size', () => {
      setup(Array.from(Array(99999).keys()), {
        containerTarget: () => container,
        wrapperTarget: () => wrapper,
        itemHeight: 30,
      });

      act(() => {
        hook.result.current[1](80);
      });

      // 10 items plus 5 overscan * 2
      expect(hook.result.current[0].length).toBe(20);
      expect(container.scrollTop).toBe(80 * 30);
    });

    it('test with fixed height when overscan equals 0', () => {
      setup(Array.from(Array(99999).keys()), {
        overscan: 0,
        itemHeight: 30,
        containerTarget: () => container,
        wrapperTarget: () => wrapper,
      });

      act(() => {
        hook.result.current[1](20);
      });

      expect(hook.result.current[0].length).toBe(10);
      expect(wrapper.style.marginTop).toBe(20 * 30 + 'px');
      expect(container.scrollTop).toBe(20 * 30);
    });

    it('test with fixed height when overscan equals 1', () => {
      setup(Array.from(Array(99999).keys()), {
        overscan: 1,
        itemHeight: 30,
        containerTarget: () => container,
        wrapperTarget: () => wrapper,
      });

      act(() => {
        hook.result.current[1](20);
      });

      expect(hook.result.current[0].length).toBe(300 / 30 + 2);
      expect(wrapper.style.marginTop).toBe(20 * 30 - 30 * 1 + 'px');
      expect(container.scrollTop).toBe(20 * 30);
    });

    it('test with dynamic height when overscan equals 0', () => {
      setup(Array.from(Array(99999).keys()), {
        overscan: 0,
        containerTarget: () => container,
        wrapperTarget: () => wrapper,
        itemHeight: (i: number) => (i % 2 === 0 ? 30 : 60),
      });

      act(() => {
        hook.result.current[1](20);
      });

      // average height for easy calculation
      const averageHeight = (30 + 60) / 2;

      expect(hook.result.current[0].length).toBe(Math.ceil(300 / averageHeight));
      expect(container.scrollTop).toBe(10 * 30 + 10 * 60);
      expect((hook.result.current[0][0] as { data: number }).data).toBe(20);
      expect((hook.result.current[0][0] as { index: number }).index).toBe(20);
      expect((hook.result.current[0][5] as { data: number }).data).toBe(25);
      expect((hook.result.current[0][5] as { index: number }).index).toBe(25);

      expect(wrapper.style.marginTop).toBe(20 * averageHeight + 'px');
      expect(wrapper.style.height).toBe((99998 - 20) * averageHeight + 30 + 'px');
    });

    it('test with dynamic height when overscan equals 1', () => {
      setup(Array.from(Array(99999).keys()), {
        overscan: 1,
        containerTarget: () => container,
        wrapperTarget: () => wrapper,
        itemHeight: (i: number) => (i % 2 === 0 ? 30 : 60),
      });

      act(() => {
        hook.result.current[1](20);
      });

      // average height for easy calculation
      const averageHeight = (30 + 60) / 2;

      expect(hook.result.current[0].length).toBe(Math.ceil(300 / averageHeight) + 2);
      expect(container.scrollTop).toBe(10 * 30 + 10 * 60);

      expect(wrapper.style.marginTop).toBe(20 * averageHeight - 60 + 'px');
      expect(container.scrollTop).toBe(20 * averageHeight);
    });
  });
});
