import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';

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

  const request = req =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (req === 0) {
          reject(new Error('fail'));
        } else {
          resolve('success');
        }
      }, 2000);
    });

  it('should be defined', () => {
    expect(useRequest).toBeDefined();
  });

  const setUp = (service, options) => renderHook(() => useRequest(service, options))
  let hook;
  it('useRequest should auto run', async () => {
    let successValue;
    const successCallback = text => {
      successValue = text;
    };
    const errorCallback = jest.fn();

    act(() => {
      hook = setUp(request, {
        onSuccess: successCallback,
        onError: errorCallback
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    expect(successValue).toEqual('success');
    expect(errorCallback).not.toHaveBeenCalled();
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();

    act(() => {
      hook.result.current.run(1);
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();

    hook.unmount();
  });

  it('useRequest should be manually triggered', async () => {
    act(() => {
      hook = setUp(request, {
        manual: true
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
  })

  it('useRequest polling should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(() => {
        callback();
        return request();
      }, {
        pollingInterval: 100
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    expect(callback).toHaveBeenCalled();

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.cancel();
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.run();
    });
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(4);

    hook.unmount();
  })

  it('useRequest fetchKey should work', async () => {
    act(() => {
      hook = setUp(request, {
        manual: true,
        fetchKey: id => id
      });
    });
    act(() => {
      hook.result.current.run(1);
      hook.result.current.run(2);
      hook.result.current.run(3);
    });
    expect(hook.result.current.fetches[1].loading).toEqual(true);
    expect(hook.result.current.fetches[2].loading).toEqual(true);
    expect(hook.result.current.fetches[3].loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.fetches[1].loading).toEqual(false);
    expect(hook.result.current.fetches[2].loading).toEqual(false);
    expect(hook.result.current.fetches[3].loading).toEqual(false);
    expect(hook.result.current.fetches[1].data).toEqual('success');
    expect(hook.result.current.fetches[2].data).toEqual('success');
    expect(hook.result.current.fetches[3].data).toEqual('success');
    hook.unmount();
  });

  it('useRequest debounceInterval should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(() => {
        callback();
        return request();
      }, {
        manual: true,
        debounceInterval: 100
      });
    });

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.run(3);
      jest.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.run(3);
      jest.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  })

  it('useRequest throttleInterval should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(() => {
        callback();
        return request();
      }, {
        manual: true,
        throttleInterval: 100
      });
    });

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.run(3);
      jest.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });

  it('useRequest cacheKey should work', async () => {
    act(() => {
      hook = setUp(request, {
        cacheKey: 'testCacheKey'
      });
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();

    let hook2;
    act(() => {
      hook2 = setUp(request, {
        cacheKey: 'testCacheKey'
      });
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    jest.runAllTimers();
    await hook2.waitForNextUpdate();
    expect(hook2.result.current.loading).toEqual(false);
    hook2.unmount();
  });

  it('useRequest mutate should work', async () => {
    act(() => {
      hook = setUp(request);
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    act(() => {
      hook.result.current.mutate('hello');
    });
    expect(hook.result.current.data).toEqual('hello');
    hook.unmount();
  })

  it('useRequest loadingDelay should work', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useRequest loadingDelay should delay', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 500
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    jest.advanceTimersByTime(501);
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  })
})
