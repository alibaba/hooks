import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import useInfiniteScroll from '..';
import type { Data, Service, InfiniteScrollOptions } from '../types';
import { sleep } from '../../utils/testingHelpers';

let count = 0;
export async function mockRequest() {
  await sleep(1000);
  if (count >= 1) {
    return { list: [4, 5, 6] };
  }
  count++;
  return {
    list: [1, 2, 3],
    nextId: count,
  };
}

const targetEl = document.createElement('div');

// set target property
function setTargetInfo(key: 'scrollTop', value) {
  Object.defineProperty(targetEl, key, {
    value,
    configurable: true,
  });
}

const setup = <T extends Data>(service: Service<T>, options?: InfiniteScrollOptions<T>) =>
  renderHook(() => useInfiniteScroll(service, options));

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    count = 0;
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should auto load', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBe(false);
  });

  it('loadMore should be work', async () => {
    const { result } = setup(mockRequest, { manual: true });
    const { loadMore, loading } = result.current;
    expect(loading).toBe(false);
    act(() => {
      loadMore();
    });
    expect(result.current.loadingMore).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loadingMore).toBe(false);
  });

  it('noMore should be true when isNoMore is true', async () => {
    const { result } = setup(mockRequest, {
      isNoMore: (d) => d?.nextId === undefined,
    });
    const { loadMore } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.noMore).toBe(false);
    act(() => loadMore());
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.noMore).toBe(true);
  });

  it('should auto load when scroll to bottom', async () => {
    const events = {};
    const mockAddEventListener = jest
      .spyOn(targetEl, 'addEventListener')
      .mockImplementation((eventName, callback) => {
        events[eventName] = callback;
      });
    const { result } = setup(mockRequest, {
      target: targetEl,
      isNoMore: (d) => d?.nextId === undefined,
    });
    // not work when loading
    expect(result.current.loading).toBe(true);
    events['scroll']();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBe(false);
    const scrollHeightSpy = jest
      .spyOn(targetEl, 'scrollHeight', 'get')
      .mockImplementation(() => 150);
    const clientHeightSpy = jest
      .spyOn(targetEl, 'clientHeight', 'get')
      .mockImplementation(() => 300);
    setTargetInfo('scrollTop', 100);
    act(() => {
      events['scroll']();
    });
    expect(result.current.loadingMore).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loadingMore).toBe(false);

    // not work when no more
    expect(result.current.noMore).toBe(true);
    act(() => {
      events['scroll']();
    });
    expect(result.current.loadingMore).toBe(false);
    // get list by order
    expect(result.current.data?.list).toMatchObject([1, 2, 3, 4, 5, 6]);

    mockAddEventListener.mockRestore();
    scrollHeightSpy.mockRestore();
    clientHeightSpy.mockRestore();
  });

  it('should auto load when scroll to top', async () => {
    const events = {};
    const mockAddEventListener = jest
      .spyOn(targetEl, 'addEventListener')
      .mockImplementation((eventName, callback) => {
        events[eventName] = callback;
      });
    // Mock scrollTo using Object.defineProperty
    Object.defineProperty(targetEl, 'scrollTo', {
      value: (x: number, y: number) => {
        setTargetInfo('scrollTop', y);
      },
      writable: true,
    });

    const { result } = setup(mockRequest, {
      target: targetEl,
      direction: 'top',
      isNoMore: (d) => d?.nextId === undefined,
    });
    // not work when loading
    expect(result.current.loading).toBe(true);
    events['scroll']();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBe(false);

    // mock first scroll
    const scrollHeightSpy = jest
      .spyOn(targetEl, 'scrollHeight', 'get')
      .mockImplementation(() => 150);
    const clientHeightSpy = jest
      .spyOn(targetEl, 'clientHeight', 'get')
      .mockImplementation(() => 500);
    setTargetInfo('scrollTop', 300);

    act(() => {
      events['scroll']();
    });
    // mock scroll upward
    setTargetInfo('scrollTop', 50);

    act(() => {
      events['scroll']();
    });

    expect(result.current.loadingMore).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loadingMore).toBe(false);
    //reverse order
    expect(result.current.data?.list).toMatchObject([4, 5, 6, 1, 2, 3]);

    // not work when no more
    expect(result.current.noMore).toBe(true);
    act(() => {
      events['scroll']();
    });
    expect(result.current.loadingMore).toBe(false);

    mockAddEventListener.mockRestore();
    scrollHeightSpy.mockRestore();
    clientHeightSpy.mockRestore();
  });

  it('reload should be work', async () => {
    const fn = jest.fn(() => Promise.resolve({ list: [] }));
    const { result } = setup(fn);
    const { reload } = result.current;
    expect(fn).toBeCalledTimes(1);
    act(() => reload());
    expect(fn).toBeCalledTimes(2);
    await act(async () => {
      Promise.resolve();
    });
  });

  it('reload should be triggered when reloadDeps change', async () => {
    const fn = jest.fn(() => Promise.resolve({ list: [] }));
    const { result } = renderHook(() => {
      const [value, setValue] = useState('');
      const res = useInfiniteScroll(fn, {
        reloadDeps: [value],
      });
      return {
        ...res,
        setValue,
      };
    });
    expect(fn).toBeCalledTimes(1);
    act(() => {
      result.current.setValue('ahooks');
    });
    expect(fn).toBeCalledTimes(2);
    await act(async () => {
      Promise.resolve();
    });
  });

  it('reload data should be latest', async () => {
    let listCount = 5;
    const mockRequestFn = async () => {
      await sleep(1000);
      return {
        list: Array.from({
          length: listCount,
        }).map((_, index) => index + 1),
        nextId: listCount,
        hasMore: listCount > 2,
      };
    };

    const { result } = setup(mockRequestFn);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.data).toMatchObject({ list: [1, 2, 3, 4, 5], nextId: 5 });

    listCount = 3;
    await act(async () => {
      result.current.reload();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.data).toMatchObject({ list: [1, 2, 3], nextId: 3 });
  });

  it('mutate should be work', async () => {
    const { result } = setup(mockRequest);
    const { mutate } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.data).toMatchObject({ list: [1, 2, 3], nextId: 1 });
    const newData = {
      list: [1, 2],
      nextId: 1,
    };
    act(() => mutate(newData));
    expect(result.current.data).toMatchObject(newData);
  });

  it('cancel should be work', () => {
    const onSuccess = jest.fn();
    const { result } = setup(mockRequest, {
      onSuccess,
    });
    const { cancel } = result.current;
    expect(result.current.loading).toBe(true);
    act(() => cancel());
    expect(result.current.loading).toBe(false);
    expect(onSuccess).not.toBeCalled();
  });

  it('onBefore/onSuccess/onFinally should be called', async () => {
    const onBefore = jest.fn();
    const onSuccess = jest.fn();
    const onFinally = jest.fn();
    const { result } = setup(mockRequest, {
      onBefore,
      onSuccess,
      onFinally,
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(onBefore).toBeCalled();
    expect(onSuccess).toBeCalled();
    expect(onFinally).toBeCalled();
  });

  it('onError should be called when throw error', async () => {
    const onError = jest.fn();
    const mockRequestError = () => {
      return Promise.reject('error');
    };
    setup(mockRequestError, {
      onError,
    });
    await act(async () => {
      Promise.resolve();
    });
    expect(onError).toBeCalled();
  });

  it('loadMoreAsync should be work', async () => {
    const { result } = setup(mockRequest, {
      manual: true,
    });
    const { loadMoreAsync } = result.current;
    act(() => {
      loadMoreAsync().then((res) => {
        expect(res).toMatchObject({ list: [1, 2, 3], nextId: 1 });
        expect(result.current.loading).toBe(false);
      });
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
  });

  it('reloadAsync should be work', async () => {
    const fn = jest.fn(() => Promise.resolve({ list: [] }));
    const { result } = setup(fn);
    const { reloadAsync } = result.current;
    expect(fn).toBeCalledTimes(1);

    act(() => {
      reloadAsync().then(() => {
        expect(fn).toBeCalledTimes(2);
      });
    });
    await act(async () => {
      Promise.resolve();
    });
  });

  it('loading should be true when reload after loadMore', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBeTruthy();
    const { reload, loadMore } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();

    act(() => {
      loadMore();
      reload();
    });
    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();
  });

  it('loading should be true when reloadAsync after loadMore', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBeTruthy();
    const { reloadAsync, loadMore } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();

    act(() => {
      loadMore();
      reloadAsync();
    });
    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();
  });

  it('list can be null or undefined', async () => {
    // @ts-ignore
    const { result } = setup(async function () {
      await sleep(1000);
      count++;
      return {
        list: Math.random() < 0.5 ? null : undefined,
        nextId: count,
      };
    });

    expect(result.current.loading).toBeTruthy();

    const { loadMore } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();

    act(() => {
      loadMore();
    });
  });

  it('error result', async () => {
    const { result } = setup(async () => {
      throw new Error('error message');
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.error?.message).toBe('error message');
  });
});
