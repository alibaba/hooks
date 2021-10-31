import { act, renderHook } from '@testing-library/react-hooks';
import useRetryPlugin from '../src/plugins/useRetryPlugin';
import useRequest from '../index';

describe('useRetryPlugin', () => {
  it('should be defined', () => {
    expect(useRetryPlugin).toBeDefined();
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

  const setUp = (service, options, plugins) =>
    renderHook((o) => useRequest(service, o || options, plugins));

  let hook;
  it('useRetryPlugin should work', async () => {
    let errorCallback;
    act(() => {
      errorCallback = jest.fn();
      hook = setUp(
        () => request(0),
        {
          retryCount: 3,
          onError: errorCallback,
        },
        useRetryPlugin,
      );
    });
    jest.setTimeout(10000);
    jest.advanceTimersByTime(500);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(2);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(3);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(4);
    jest.runAllTimers();
    expect(errorCallback).toHaveBeenCalledTimes(4);
    hook.unmount();

    //cancel should work
    let hook2;
    act(() => {
      errorCallback = jest.fn();
      hook2 = setUp(
        () => request(0),
        {
          retryCount: 3,
          onError: errorCallback,
        },
        useRetryPlugin,
      );
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    await hook2.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    await hook2.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook2.result.current.cancel();
    jest.runAllTimers();
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook2.unmount();
  });
});
