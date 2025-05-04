import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('usePollingPlugin', () => {
  jest.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;

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

  let hook2: RenderHookResult<any, any>;
  it('usePollingPlugin pollingErrorRetryCount=3 should work', async () => {
    // if request error and set pollingErrorRetryCount
    // and the number of consecutive failures exceeds pollingErrorRetryCount, polling stops
    let errorCallback: jest.Mock | undefined = undefined;
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
});
