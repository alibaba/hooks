import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useRetryPlugin', () => {
  jest.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;
  let hook2: RenderHookResult<any, any>;

  it('useRetryPlugin should work', async () => {
    let errorCallback: jest.Mock | undefined = undefined;
    act(() => {
      errorCallback = jest.fn();
      hook = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    act(() => {
      jest.setTimeout(10000);
      jest.advanceTimersByTime(500);
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(1));

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
    hook.unmount();

    // cancel should work
    act(() => {
      errorCallback = jest.fn();
      hook2 = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(1));

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(2));
    act(() => {
      hook2.result.current.cancel();
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook2.unmount();
  });
});
