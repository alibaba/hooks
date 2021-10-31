import { act, renderHook } from '@testing-library/react-hooks';
import useThrottlePlugin from '../src/plugins/useThrottlePlugin';
import useRequest from '../index';

describe('useThrottlePlugin', () => {
  it('should be defined', () => {
    expect(useThrottlePlugin).toBeDefined();
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
        useThrottlePlugin,
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

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });
});
