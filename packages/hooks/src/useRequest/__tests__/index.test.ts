import { act, renderHook } from '@testing-library/react-hooks';
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
});
