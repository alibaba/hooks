import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useRequest from '../index';

const dataSource = [
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


describe('useRequest', () => {
  const originalError = console.error;
  beforeAll(() => {
    jest.useFakeTimers();
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });
  afterAll(() => {
    console.error = originalError;
  });

  const asyncFn = ({ pageSize, offset }) =>
    new Promise(resolve => {
      resolve({
        total: dataSource.length,
        list: dataSource.slice(offset, offset + pageSize),
      });
    });

  const setUp = (service, options) => renderHook(() => useRequest(service, options))

  let hook;

  it('useRequest loadMore should work', async () => {
    act(() => {
      hook = setUp(d => asyncFn({
        offset: d ? d.list.length : 0,
        pageSize: 3,
      }), {
        loadMore: true,
        isNoMore: d => (d ? d.total <= d.list.length : false)
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.noMore).toEqual(false);
    expect(hook.result.current.data.list.length).toEqual(3);

    act(() => {
      hook.result.current.loadMore();
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.loadingMore).toEqual(true);
    expect(hook.result.current.data.list.length).toEqual(3);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loadingMore).toEqual(false);
    expect(hook.result.current.data.list.length).toEqual(6);
    act(() => {
      hook.result.current.loadMore();
    });
    await hook.waitForNextUpdate();
    act(() => {
      hook.result.current.loadMore();
    });
    expect(hook.result.current.loadingMore).toEqual(true);
    expect(hook.result.current.data.list.length).toEqual(9);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loadingMore).toEqual(false);
    expect(hook.result.current.data.list.length).toEqual(10);
    expect(hook.result.current.noMore).toEqual(true);
    act(() => {
      hook.result.current.reload();
    });
    expect(hook.result.current.loading).toEqual(true);
    await hook.waitForNextUpdate();
    expect(hook.result.current.data.list.length).toEqual(3);
    hook.unmount();
  });
});
