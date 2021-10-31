import { act, renderHook } from '@testing-library/react-hooks';
import usePollingPlugin from '../src/plugins/usePollingPlugin';
import useRequest from '../index';

describe('usePollingPlugin', () => {
  it('should be defined', () => {
    expect(usePollingPlugin).toBeDefined();
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
  it('usePollingPlugin should work', async () => {
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
        usePollingPlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.cancel();
    });
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.run();
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(4);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(5);

    hook.unmount();
  });
});
