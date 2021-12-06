import { act, renderHook } from '@testing-library/react-hooks';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useReadyPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;

  it('useReadyPlugin manual=false ready=true work fine', async () => {
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

  it('useReadyPlugin manual=false ready=false work fine', async () => {
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

  it('useReadyPlugin manual=false defaultParams work fine', async () => {
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

  it('useReadyPlugin manual=true ready work fine', async () => {
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
});
