import { act, renderHook } from '@testing-library/react-hooks';
import MockDate from 'mockdate';
import useCachePlugin from '../src/plugins/useCachePlugin';
import useRequest from '../index';

describe('useCachePlugin', () => {
  it('should be defined', () => {
    expect(useCachePlugin).toBeDefined();
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
  it('useRequest cacheKey should work', async () => {
    act(() => {
      hook = setUp(
        request,
        {
          cacheKey: 'testCacheKey',
        },
        useCachePlugin,
      );
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();

    let hook2;
    act(() => {
      hook2 = setUp(
        request,
        {
          cacheKey: 'testCacheKey',
        },
        useCachePlugin,
      );
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    jest.runAllTimers();
    await hook2.waitForNextUpdate();
    expect(hook2.result.current.loading).toEqual(false);
    hook2.unmount();
  });

  it('useRequest staleTime should work', async () => {
    MockDate.set(0);

    act(() => {
      hook = setUp(
        request,
        {
          cacheKey: 'testStaleTime',
          staleTime: 3000,
        },
        useCachePlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
    MockDate.set(1000);

    let hook2;
    act(() => {
      hook2 = setUp(
        request,
        {
          cacheKey: 'testStaleTime',
          staleTime: 3000,
        },
        useCachePlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();
    MockDate.set(3001);
    let hook3;
    act(() => {
      hook3 = setUp(
        request,
        {
          cacheKey: 'testStaleTime',
          staleTime: 3000,
        },
        useCachePlugin,
      );
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual('success');
    jest.runAllTimers();
    await hook3.waitForNextUpdate();
    expect(hook3.result.current.loading).toEqual(false);
    hook3.unmount();
  });

  it('useRequest cacheTime should work', async () => {
    MockDate.set(0);

    act(() => {
      hook = setUp(
        request,
        {
          cacheKey: 'testCacheTime',
          cacheTime: 5000,
        },
        useCachePlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
    MockDate.set(1000);
    jest.advanceTimersByTime(1000);

    let hook2;
    act(() => {
      hook2 = setUp(
        request,
        {
          cacheKey: 'testCacheTime',
          cacheTime: 5000,
        },
        useCachePlugin,
      );
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();
    MockDate.set(6001);
    jest.advanceTimersByTime(5001);

    let hook3;
    act(() => {
      hook3 = setUp(
        request,
        {
          cacheKey: 'testCacheTime',
          cacheTime: 5000,
        },
        useCachePlugin,
      );
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual(undefined);
    jest.runAllTimers();
    await hook3.waitForNextUpdate();
    expect(hook3.result.current.loading).toEqual(false);
    expect(hook3.result.current.data).toEqual('success');
    hook3.unmount();
  });
});
