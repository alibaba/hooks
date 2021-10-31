import { act, renderHook } from '@testing-library/react-hooks';
import useRefreshDeps from '../src/plugins/useRefreshDeps';
import useRequest from '../index';

describe('useRefreshDeps', () => {
  it('should be defined', () => {
    expect(useRefreshDeps).toBeDefined();
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
  it('useRefreshDeps should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(
        request,
        {
          refreshDeps: [dep],
        },
        useRefreshDeps,
      );
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });
});
