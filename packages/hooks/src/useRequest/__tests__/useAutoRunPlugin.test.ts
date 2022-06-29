import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useAutoRunPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;

  it('useAutoRunPlugin ready should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useAutoRunPlugin manual=false ready=true work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: true,
      });
    });

    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: false,
    });
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: true,
    });

    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useAutoRunPlugin manual=false ready=false work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: false,
      });
    });

    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: true,
    });

    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: false,
    });
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useAutoRunPlugin manual=false ready&defaultParams work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: false,
        defaultParams: [1],
      });
    });

    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: true,
      defaultParams: [2],
    });

    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.params).toEqual([2]);

    hook.rerender({
      ready: false,
      defaultParams: [2],
    });
    hook.rerender({
      ready: true,
      defaultParams: [3],
    });

    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.params).toEqual([3]);

    hook.unmount();
  });

  it('useAutoRunPlugin manual=true ready work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: false,
        manual: true,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      hook.result.current.run();
    });
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: true,
      manual: true,
    });
    expect(hook.result.current.loading).toEqual(false);

    act(() => {
      hook.result.current.run();
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useAutoRunPlugin manual=false refreshDeps should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(false);
    hook.unmount();
  });

  it('useAutoRunPlugin manual=true refreshDeps should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        manual: true,
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toEqual(false);

    dep = 2;
    hook.rerender({
      manual: true,
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toEqual(false);

    hook.unmount();
  });

  it('useAutoRunPlugin refreshDepsAction should work', async () => {
    let dep = 1;
    let count = 0;
    let refreshDepsAction = () => {
      count += 1;
    };
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
        refreshDepsAction,
      });
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
      refreshDepsAction,
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(count).toEqual(1);

    hook.rerender({
      refreshDeps: [dep],
      refreshDepsAction,
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(count).toEqual(1);

    dep = 3;
    hook.rerender({
      refreshDeps: [dep],
      refreshDepsAction,
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(count).toEqual(2);

    hook.unmount();
  });

  it('useAutoRunPlugin ready & refreshDeps change same time work fine', async () => {
    const fn = jest.fn();

    const asyncFn = () => {
      return new Promise((resolve) => {
        fn();
        return resolve('success');
      });
    };

    act(() => {
      hook = setUp(asyncFn, {
        ready: false,
        defaultParams: [1],
        refreshDeps: [1],
      });
    });

    expect(hook.result.current.loading).toEqual(false);

    hook.rerender({
      ready: true,
      defaultParams: [2],
      refreshDeps: [2],
    });
    expect(hook.result.current.loading).toEqual(true);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.params).toEqual([2]);
    expect(fn).toHaveBeenCalledTimes(1);

    hook.unmount();
  });
});
