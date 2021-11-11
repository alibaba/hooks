import { act, renderHook } from '@testing-library/react-hooks';
import MockDate from 'mockdate';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useCachePlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('useRequest cacheKey should work', async () => {
    act(() => {
      hook = setUp(request, {
        cacheKey: 'testCacheKey',
      });
    });

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();

    let hook2;
    act(() => {
      hook2 = setUp(request, {
        cacheKey: 'testCacheKey',
      });
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');

    act(() => {
      jest.runAllTimers();
    });
    await hook2.waitForNextUpdate();
    expect(hook2.result.current.loading).toEqual(false);
    hook2.unmount();
  });

  it('useRequest staleTime should work', async () => {
    MockDate.set(0);

    act(() => {
      hook = setUp(request, {
        cacheKey: 'testStaleTime',
        staleTime: 3000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
    MockDate.set(1000);

    let hook2;
    act(() => {
      hook2 = setUp(request, {
        cacheKey: 'testStaleTime',
        staleTime: 3000,
      });
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();
    MockDate.set(3001);
    let hook3;
    act(() => {
      hook3 = setUp(request, {
        cacheKey: 'testStaleTime',
        staleTime: 3000,
      });
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual('success');

    act(() => {
      jest.runAllTimers();
    });
    await hook3.waitForNextUpdate();
    expect(hook3.result.current.loading).toEqual(false);
    hook3.unmount();
  });

  it('useRequest cacheTime should work', async () => {
    act(() => {
      MockDate.set(0);
      hook = setUp(request, {
        cacheKey: 'testCacheTime',
        cacheTime: 5000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();

    act(() => {
      MockDate.set(1000);
      jest.advanceTimersByTime(1000);
    });

    let hook2;
    act(() => {
      hook2 = setUp(request, {
        cacheKey: 'testCacheTime',
        cacheTime: 5000,
      });
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();
    act(() => {
      MockDate.set(6001);
      jest.advanceTimersByTime(5001);
    });

    let hook3;
    act(() => {
      hook3 = setUp(request, {
        cacheKey: 'testCacheTime',
        cacheTime: 5000,
      });
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
    await hook3.waitForNextUpdate();
    expect(hook3.result.current.loading).toEqual(false);
    expect(hook3.result.current.data).toEqual('success');
    hook3.unmount();
  });
});
