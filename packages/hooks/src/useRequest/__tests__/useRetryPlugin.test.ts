import { act, renderHook, waitFor } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useRetryPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('useRetryPlugin should work', async () => {
    let errorCallback;
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

    //cancel should work
    let hook2;
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
