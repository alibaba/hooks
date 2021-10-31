import { act, renderHook } from '@testing-library/react-hooks';
import useLoadingDelayPlugin from '../src/plugins/useLoadingDelayPlugin';
import useRequest from '../index';

describe('useLoadingDelayPlugin', () => {
  it('should be defined', () => {
    expect(useLoadingDelayPlugin).toBeDefined();
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
  it('useLoadingDelayPlugin should work', async () => {
    act(() => {
      hook = setUp(
        request,
        {
          loadingDelay: 2000,
        },
        useLoadingDelayPlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(false);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();

    act(() => {
      hook = setUp(
        request,
        {
          loadingDelay: 500,
        },
        useLoadingDelayPlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(false);
    jest.advanceTimersByTime(501);
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });
});
