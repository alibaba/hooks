import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useInfiniteScroll from '..';
import type { Data, Service, InfiniteScrollOptions } from '../types';
import { sleep } from '../../utils/testingHelpers';

let count = 0;
export async function mockRequest() {
  await sleep(1000);
  if (count >= 1) {
    return { list: [] };
  }
  count++;
  return {
    list: [1, 2, 3],
    nextId: count,
  };
}

const targetEl = document.createElement('div');

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

  it('should be defined', () => {
    expect(useInfiniteScroll).toBeDefined();
  });

  it('should auto load', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBeFalsy();
  });

  it('loadMore should be work', async () => {
    const { result } = setup(mockRequest, { manual: true });
    const { loadMore, loading } = result.current;
    expect(loading).toBeFalsy();
    act(() => {
      loadMore();
    });
    expect(result.current.loadingMore).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loadingMore).toBeFalsy();
  });

  it('noMore should be true when isNoMore is true', async () => {
    const { result } = setup(mockRequest, {
      isNoMore: (d) => d?.nextId === undefined,
    });
    const { loadMore } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.noMore).toBeFalsy();
    act(() => loadMore());
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.noMore).toBeTruthy();
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
    expect(result.current.loading).toBeTruthy();
    events['scroll']();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBeFalsy();

    // mock scroll
    Object.defineProperties(targetEl, {
      clientHeight: {
        value: 150,
      },
      scrollHeight: {
        value: 300,
      },
      scrollTop: {
        value: 100,
      },
    });
    act(() => {
      events['scroll']();
    });
    expect(result.current.loadingMore).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loadingMore).toBeFalsy();

    // not work when no more
    expect(result.current.noMore).toBeTruthy();
    act(() => {
      events['scroll']();
    });
    expect(result.current.loadingMore).toBeFalsy();

    mockAddEventListener.mockRestore();
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
    expect(result.current.loading).toBeTruthy();
    act(() => cancel());
    expect(result.current.loading).toBeFalsy();
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
        expect(result.current.loading).toBeFalsy();
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
});
