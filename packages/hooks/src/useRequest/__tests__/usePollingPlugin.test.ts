import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('usePollingPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('usePollingPlugin pollingInterval=100 pollingWhenHidden=true  should work', async () => {
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
    expect(hook.result.current.isPolling).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.cancel();
    });
    expect(hook.result.current.isPolling).toEqual(false);

    act(() => {
      jest.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(3);
    expect(hook.result.current.isPolling).toEqual(false);

    act(() => {
      hook.result.current.run();
    });
    expect(hook.result.current.isPolling).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(4);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(5);

    hook.unmount();
  });

  let hook2;
  it('usePollingPlugin pollingErrorRetryCount=3 should work', async () => {
    // if request error and set pollingErrorRetryCount
    // and the number of consecutive failures exceeds pollingErrorRetryCount, polling stops
    let errorCallback;
    act(() => {
      errorCallback = jest.fn();
      hook2 = setUp(() => request(0), {
        pollingErrorRetryCount: 3,
        pollingInterval: 100,
        pollingWhenHidden: true,
        onError: errorCallback,
      });
    });

    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.isPolling).toEqual(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await hook2.waitForNextUpdate();
    expect(hook2.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });
    await hook2.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });
    await hook2.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(3);

    act(() => {
      jest.runAllTimers();
    });
    await hook2.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(4);
    expect(hook2.result.current.isPolling).toEqual(false);

    act(() => {
      jest.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);

    act(() => {
      hook2.result.current.run();
    });
    expect(hook2.result.current.isPolling).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook2.waitForNextUpdate();
    expect(errorCallback).toHaveBeenCalledTimes(5);

    hook2.unmount();
  });
});
