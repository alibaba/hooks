import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import MockDate from 'mockdate';
import useRequest from '../index';

describe('useRequest', () => {
  it('should be defined', () => {
    expect(useRequest).toBeDefined();
  });

  const request = (req) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (req === 0) {
          reject(new Error('fail'));
        } else {
          resolve('success');
        }
      }, 1000),
    );

  jest.useFakeTimers();
  // jest.setTimeout(20000)
  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));
  let hook;
  it('useRequest should auto run', async () => {
    let value, success;
    const successCallback = (text) => {
      success = text;
    };
    const errorCallback = jest.fn();
    const beforeCallback = () => {
      value = 'before';
    };
    const finallyCallback = () => {
      value = 'finally';
    };
    //auto run success
    act(() => {
      hook = setUp(request, {
        onSuccess: successCallback,
        onError: errorCallback,
        onBefore: beforeCallback,
        onFinally: finallyCallback,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(value).toEqual('before');
    expect(success).toEqual(undefined);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(success).toEqual('success');
    expect(hook.result.current.data).toEqual('success');
    expect(value).toEqual('finally');
    expect(errorCallback).toHaveBeenCalledTimes(0);

    //manual run fail
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);

    //manual run success
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    hook.unmount();

    //auto run fail
    act(() => {
      hook = setUp(() => request(0), {
        onSuccess: successCallback,
        onError: errorCallback,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalledTimes(2);
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
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.error).toEqual(new Error('fail'));
    hook.unmount();
  });

  it('useRequest polling should work', async () => {
    const callback = jest.fn();
    act(() => {
      hook = setUp(
        () => {
          callback();
          return request(1);
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
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.cancel();
    });
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.run();
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(4);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(5);

    // can't test for pollingWhenHidden
    // fireEvent.blur(window);
    // jest.runAllTimers();
    // await hook.waitForNextUpdate();
    // expect(callback).toHaveBeenCalledTimes(5);
    hook.unmount();
  });

  it('useRequest mutate should work', async () => {
    act(() => {
      hook = setUp(request, {});
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
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(false);
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
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
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

  it('useRequest runAsync should work', async () => {
    let success = '',
      error = '';

    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    act(() => {
      hook.result.current
        .runAsync(0)
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

    success = '';
    error = '';
    act(() => {
      hook.result.current
        .runAsync(1)
        .then((res) => {
          success = res;
        })
        .catch((err) => {
          error = err;
        });
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(success).toEqual('success');
    expect(error).toEqual('');
    hook.unmount();
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
