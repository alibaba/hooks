import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import MockDate from 'mockdate';
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

  const request = (req) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (req === 0) {
          reject(new Error('fail'));
        } else {
          resolve('success');
        }
      }, 1000);
    });

  it('should be defined', () => {
    expect(useRequest).toBeDefined();
  });

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));
  let hook;
  it('useRequest should auto run', async () => {
    let successValue;
    const successCallback = (text) => {
      successValue = text;
    };
    const errorCallback = jest.fn();

    act(() => {
      hook = setUp(request, {
        onSuccess: successCallback,
        onError: errorCallback,
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
      hook.result.current.run(0).catch(() => {});
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
        manual: true,
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
  });

  it('useRequest polling should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request();
        },
        {
          pollingInterval: 100,
          pollingWhenHidden: true,
        },
      );
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
  });

  it('useRequest fetchKey should work', async () => {
    act(() => {
      hook = setUp(request, {
        manual: true,
        fetchKey: (id) => id,
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
      hook = setUp(
        () => {
          callback();
          return request();
        },
        {
          manual: true,
          debounceInterval: 100,
        },
      );
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
  });

  it('useRequest throttleInterval should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request();
        },
        {
          manual: true,
          throttleInterval: 100,
        },
      );
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
  });

  it('useRequest loadingDelay should work', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
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
        loadingDelay: 500,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    jest.advanceTimersByTime(501);
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useRequest refreshDeps should work', async () => {
    act(() => {
      hook = setUp(request, {
        refreshDeps: [1],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.rerender({
      refreshDeps: [2],
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useRequest ready should work', async () => {
    act(() => {
      hook = setUp(request, {
        ready: false,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    hook.rerender({
      ready: true,
    });
    expect(hook.result.current.loading).toEqual(true);
    hook.unmount();
  });

  it('useRequest initialData should work', async () => {
    act(() => {
      hook = setUp(request, {
        initialData: 'hello',
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(hook.result.current.data).toEqual('hello');
    jest.runAllTimers();
    await hook.waitForNextUpdate();

    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
  });

  it('useRequest formatResult should work', async () => {
    let formarParams = '';
    act(() => {
      hook = setUp(request, {
        formatResult: (p) => {
          formarParams = p;
          return 'hello';
        },
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(formarParams).toEqual('success');
    expect(hook.result.current.data).toEqual('hello');
    hook.unmount();
  });

  it('useRequest defaultParams should work', async () => {
    act(() => {
      hook = setUp(request, {
        defaultParams: [1, 2, 3],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.params).toEqual([1, 2, 3]);
    hook.unmount();
  });

  it('useRequest refreshOnWindowFocus&focusTimespan should work', async () => {
    act(() => {
      hook = setUp(request, {
        refreshOnWindowFocus: true,
        focusTimespan: 5000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.advanceTimersByTime(1001);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    fireEvent.focus(window);
    expect(hook.result.current.loading).toEqual(true);
    jest.advanceTimersByTime(2000);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    jest.advanceTimersByTime(3000);
    fireEvent.focus(window);
    expect(hook.result.current.loading).toEqual(true);
    hook.unmount();
  });

  it('useRequest throwOnError to be false should work', async () => {
    let success = '';
    let error = '';

    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    act(() => {
      hook.result.current
        .run(0)
        .then((res) => {
          success = res;
        })
        .catch((err) => {
          error = err;
        });
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(success).toEqual('');
    expect(error).toEqual(
      'useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.',
    );
  });

  it('useRequest throwOnError to be true should work', async () => {
    let success = '';
    let error = '';

    act(() => {
      hook = setUp(request, {
        manual: true,
        throwOnError: true,
      });
    });
    act(() => {
      hook.result.current
        .run(0)
        .then((res) => {
          success = res;
        })
        .catch((err) => {
          error = err;
        });
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(success).toEqual('');
    expect(error).toEqual(new Error('fail'));
  });

  it('useRequest cacheKey should work', async () => {
    act(() => {
      hook = setUp(request, {
        cacheKey: 'testCacheKey',
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
        cacheKey: 'testCacheKey',
      });
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    jest.runAllTimers();
    await hook2.waitForNextUpdate();
    expect(hook2.result.current.loading).toEqual(false);
    hook2.unmount();
  });

  it('useRequest staleTime should work', async () => {
    MockDate.set(0);

    act(() => {
      hook = setUp(request, {
        cacheKey: 'testStaleTime',
        staleTime: 3000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
    MockDate.set(1000);

    let hook2;
    act(() => {
      hook2 = setUp(request, {
        cacheKey: 'testStaleTime',
        staleTime: 3000,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();
    MockDate.set(3001);
    let hook3;
    act(() => {
      hook3 = setUp(request, {
        cacheKey: 'testStaleTime',
        staleTime: 3000,
      });
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual('success');
    jest.runAllTimers();
    await hook3.waitForNextUpdate();
    expect(hook3.result.current.loading).toEqual(false);
    hook3.unmount();
  });

  it('useRequest cacheTime should work', async () => {
    MockDate.set(0);

    act(() => {
      hook = setUp(request, {
        cacheKey: 'testCacheTime',
        cacheTime: 5000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
    MockDate.set(1000);
    jest.advanceTimersByTime(1000);

    let hook2;
    act(() => {
      hook2 = setUp(request, {
        cacheKey: 'testCacheTime',
        cacheTime: 5000,
      });
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();
    MockDate.set(6001);
    jest.advanceTimersByTime(5001);

    let hook3;
    act(() => {
      hook3 = setUp(request, {
        cacheKey: 'testCacheTime',
        cacheTime: 5000,
      });
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual(undefined);
    jest.runAllTimers();
    await hook3.waitForNextUpdate();
    expect(hook3.result.current.loading).toEqual(false);
    expect(hook3.result.current.data).toEqual('success');
    hook3.unmount();
  });
});
