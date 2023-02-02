import { act, renderHook } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useThrottlePlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('useThrottlePlugin should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          throttleWait: 100,
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
      jest.advanceTimersByTime(40);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
