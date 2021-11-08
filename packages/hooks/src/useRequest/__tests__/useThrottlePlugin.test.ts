import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';

describe('useThrottlePlugin', () => {
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
      jest.advanceTimersByTime(50);
    });

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });
});
