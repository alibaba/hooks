import { renderHook, act } from '@testing-library/react-hooks';
import useLoadMore from '../index';

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

const dataSrouce = [
  {
    id: 1,
    title: 'Ant Design Title 1',
  },
  {
    id: 2,
    title: 'Ant Design Title 2',
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
  },
  {
    id: 4,
    title: 'Ant Design Title 4',
  },
  {
    id: 5,
    title: 'Ant Design Title 5',
  },
  {
    id: 6,
    title: 'Ant Design Title 6',
  },
  {
    id: 7,
    title: 'Ant Design Title 7',
  },
  {
    id: 8,
    title: 'Ant Design Title 8',
  },
  {
    id: 9,
    title: 'Ant Design Title 9',
  },
  {
    id: 10,
    title: 'Ant Design Title 10',
  },
];

const asyncFn = ({ pageSize, offset }: any) =>
  new Promise(resolve => {
    setTimeout(() => {
      const data =
        pageSize === -1
          ? null
          : {
              total: dataSrouce.length,
              data: dataSrouce.slice(offset, offset + pageSize),
            };
      resolve(data);
    }, 1);
  });

const callLoadmore = (hook: any) => {
  act(() => {
    const { loadMore } = hook.result.current;
    loadMore();
  });
};

const callReload = (hook: any) => {
  act(() => {
    const { reload } = hook.result.current;
    reload();
  });
};

describe('useLoadMore', () => {
  it('should be defined', () => {
    expect(useLoadMore).toBeDefined();
  });

  describe('render the first', () => {
    let hook: any;
    beforeEach(() => {
      hook = renderHook(() =>
        useLoadMore(asyncFn, undefined, {
          initPageSize: 3,
        }),
      );
    });

    it('initially starts loading', () => {
      expect(hook.result.current.loading).toBeTruthy();
    });

    it('resolves', async () => {
      expect.assertions(3);

      const { rerender, waitForNextUpdate } = hook;
      rerender();
      await waitForNextUpdate();
      const { data, total, loading } = hook.result.current;
      expect(data.length).toEqual(3);
      expect(total).toEqual(10);
      expect(loading).toBeFalsy();
    });
  });

  describe('should method run', () => {
    let hook: any;
    beforeEach(done => {
      hook = renderHook(({ fn, deps, options }) => useLoadMore(fn, [deps], options), {
        initialProps: {
          fn: asyncFn,
          deps: null,
          options: {
            itemKey: 'id',
            initPageSize: 3,
            incrementSize: 4,
          },
        },
      });

      hook.waitForNextUpdate().then(done);
    });

    it('test on loadmore', async () => {
      expect.assertions(5);

      callLoadmore(hook);
      expect(hook.result.current.loadingMore).toBeTruthy();
      await hook.waitForNextUpdate();
      expect(hook.result.current.loadingMore).toBeFalsy();
      expect(hook.result.current.data.length).toEqual(7);

      callLoadmore(hook);
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(10);
      expect(hook.result.current.noMore).toBeTruthy();
    });

    it('test on reload', async () => {
      expect.assertions(6);

      hook.rerender({
        fn: asyncFn,
        deps: [],
        options: {
          initPageSize: 4,
          itemKey: (item: any, index: any) => undefined,
        },
      });

      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(4);

      callLoadmore(hook);
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(8);

      callLoadmore(hook);
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(10);

      // 测试边界值
      callLoadmore(hook);

      callReload(hook);
      expect(hook.result.current.loading).toBeTruthy();
      await hook.waitForNextUpdate();
      expect(hook.result.current.loadingMore).toBeFalsy();
      expect(hook.result.current.data.length).toEqual(4);
    });
  });

  describe('the additional dependencies list changes', () => {
    const result = [
      {
        id: 1222,
        title: 'hahaha',
      },
    ];

    let callCount = 0;
    // 模拟一个dom对象
    const ref = {
      current: {
        scrollHeight: 800,
        scrollTop: 0,
        clientHeight: 200,
        addEventListener(trigger: any, callback: any) {
          callCount = 1;
          callback();
        },
        removeEventListener(trigger: any, callback: any) {
          callCount = 2;
          callback();
        },
      },
    };

    let hook: any;
    beforeEach(done => {
      callCount = 0;
      hook = renderHook(({ fn, deps, options }) => useLoadMore(fn, [deps], options), {
        initialProps: {
          fn: asyncFn,
          deps: null,
          options: {
            initPageSize: 3,
            incrementSize: 4,
            threshold: 100,
          },
        },
      });
      hook.waitForNextUpdate().then(done);
    });

    it('test on different options', async () => {
      // expect.assertions(2);

      hook.rerender({
        fn: asyncFn,
        deps: [],
        options: {
          initPageSize: 6,
          threshold: 200,
          itemKey: (item: any, index: any) => 'id',
          formatResult: (res: any) => ({
            total: 0,
            data: result,
          }),
        },
      });
      await hook.waitForNextUpdate();

      expect(hook.result.current.data).toEqual(result);
      expect(hook.result.current.total).toEqual(0);

      // 测试边界溢出
      hook.rerender({
        fn: asyncFn,
        deps: [],
        options: {
          initPageSize: -1,
          incrementSize: -1,
          threshold: 200,
          itemKey: (item: any, index: any) => 'id',
          formatResult: (res: any) => ({
            total: 0,
            data: result,
          }),
        },
      });
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(0);
    });

    it('test on dom scroll', async () => {
      expect(hook.result.current.data.length).toEqual(3);
      expect(hook.result.current.noMore).toBeFalsy();

      ref.current.scrollTop = 100;

      hook.rerender({
        fn: asyncFn,
        deps: [],
        options: {
          initPageSize: 6,
          threshold: 100,
          ref,
        },
      });
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(6);
      expect(hook.result.current.noMore).toBeFalsy();

      ref.current.scrollTop = 600;

      hook.rerender({
        fn: asyncFn,
        deps: [],
        options: {
          initPageSize: 10,
          threshold: 100,
          ref,
        },
      });
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.length).toEqual(10);
      expect(hook.result.current.noMore).toBeTruthy();

      hook.unmount();
      expect(callCount).toEqual(2);
    });
  });
});
