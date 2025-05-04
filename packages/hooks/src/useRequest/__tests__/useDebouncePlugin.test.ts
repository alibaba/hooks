import { act, renderHook, waitFor } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useDebouncePlugin', () => {
  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('useDebouncePlugin should work', async () => {
    jest.useFakeTimers();
    const callback = jest.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          debounceWait: 100,
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

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.run(3);
      jest.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.cancel();
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });
});
