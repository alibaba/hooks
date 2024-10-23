import { act, renderHook, waitFor } from '@testing-library/react';
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
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.data).toBe('success');
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(3));

    act(() => {
      hook.result.current.cancel();
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.run();
    });
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(4));

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(5));
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

    expect(hook2.result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook2.result.current.loading).toBe(false));
    expect(errorCallback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(2));

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(3));

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(4));

    act(() => {
      jest.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);

    act(() => {
      hook2.result.current.run();
    });
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(5));
  });

  it('usePollingPlugin pollingInterval=100 pollingWhenHidden=true should return pollingLoading', async () => {
    let hook;
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
    expect(hook.result.current.loading).toBe(true);
    // Initial state: pollingLoading should be false
    expect(hook.result.current.pollingLoading).toBe(false);

    // first request completed
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(callback).toHaveBeenCalledTimes(1);

    // trigger the next polling request
    act(() => {
      jest.runAllTimers();
    });
    expect(hook.result.current.loading).toBe(true);
    // pollingLoading: true => false
    expect(hook.result.current.pollingLoading).toBe(true);
    await waitFor(() => expect(hook.result.current.pollingLoading).toBe(false));
    expect(hook.result.current.data).toBe('success');
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });
    // pollingLoading: true => false, synchronized with loading
    expect(hook.result.current.loading).toBe(true);
    expect(hook.result.current.pollingLoading).toBe(true);
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.pollingLoading).toBe(false);
    expect(hook.result.current.data).toBe('success');
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.cancel();
    });
    expect(hook.result.current.pollingLoading).toBe(false);

    // should be false in manual run
    act(() => {
      hook.result.current.run();
    });
    expect(hook.result.current.loading).toBe(true);
    expect(hook.result.current.pollingLoading).toBe(false);
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(4));

    // first request completed
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    act(() => {
      jest.runAllTimers();
    });
    // pollingLoading: true => false
    expect(hook.result.current.pollingLoading).toBe(true);
    await waitFor(() => expect(hook.result.current.pollingLoading).toBe(false));
  });
});
