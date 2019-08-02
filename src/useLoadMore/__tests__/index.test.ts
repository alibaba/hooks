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

const data = [
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
      resolve({
        total: data.length,
        data: data.slice(offset, offset + pageSize),
      });
    }, 1);
  });

describe('useLoadMore', () => {
  it('should be defined', () => {
    expect(useLoadMore).toBeDefined();
  });

  const hook = renderHook(({ fn, deps, options }) => useLoadMore(fn, deps, options), {
    initialProps: { fn: asyncFn, deps: [], options: { initPageSize: 3, incrementSize: 4 } },
  });

  it('render the first', async () => {
    expect(hook.result.current.loading).toBeTruthy();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data.length).toEqual(3);
    expect(hook.result.current.total).toEqual(10);
    act(() => {
      hook.result.current.loadMore();
    });
    expect(hook.result.current.loadingMore).toBeTruthy();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data.length).toEqual(7);
    act(() => {
      hook.result.current.loadMore();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.data.length).toEqual(10);
    expect(hook.result.current.noMore).toBeTruthy();
    act(() => {
      hook.result.current.loadMore();
    });
    expect(hook.result.current.data.length).toEqual(10);

    act(() => {
      hook.result.current.reload();
    });
    expect(hook.result.current.loading).toBeTruthy();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data.length).toEqual(3);
  });
});
