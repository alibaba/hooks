import { act, renderHook } from '@testing-library/react-hooks';
import useRequest, { clearCache } from '../index';
import { request } from '../../utils/testingHelpers';
import 'jest-localstorage-mock';

describe('useCachePlugin', () => {
  jest.useFakeTimers();

  const setup = (service, options) => renderHook(() => useRequest(service, options));

  const testCacheKey = async (options: any) => {
    const hook = setup(request, options);
    expect(hook.result.current.loading).toEqual(true);
    await act(async () => {
      jest.runAllTimers();
    });
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
  };

  it('useRequest cacheKey should work', async () => {
    await testCacheKey({
      cacheKey: 'testCacheKey',
    });

    jest.advanceTimersByTime(100);

    const hook2 = setup(request, {
      cacheKey: 'testCacheKey',
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    await act(async () => {
      jest.runAllTimers();
    });
    expect(hook2.result.current.loading).toEqual(false);
  });

  it('useRequest staleTime should work', async () => {
    await testCacheKey({
      cacheKey: 'testStaleTime',
      staleTime: 3000,
    });

    jest.advanceTimersByTime(1000);

    const hook2 = setup(request, {
      cacheKey: 'testStaleTime',
      staleTime: 3000,
    });
    expect(hook2.result.current.loading).toEqual(false);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();

    jest.advanceTimersByTime(3001);

    const hook3 = setup(request, {
      cacheKey: 'testStaleTime',
      staleTime: 3000,
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual('success');

    await act(async () => {
      jest.runAllTimers();
    });
    expect(hook3.result.current.loading).toEqual(false);
  });

  it('useRequest cacheTime should work', async () => {
    await testCacheKey({
      cacheKey: 'testCacheTime',
      cacheTime: 5000,
    });

    jest.advanceTimersByTime(1000);

    const hook2 = setup(request, {
      cacheKey: 'testCacheTime',
      cacheTime: 5000,
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');
    hook2.unmount();

    jest.advanceTimersByTime(5001);

    const hook3 = setup(request, {
      cacheKey: 'testCacheTime',
      cacheTime: 5000,
    });
    expect(hook3.result.current.loading).toEqual(true);
    expect(hook3.result.current.data).toEqual(undefined);

    await act(async () => {
      jest.runAllTimers();
    });
    expect(hook3.result.current.loading).toEqual(false);
    expect(hook3.result.current.data).toEqual('success');
  });

  it('clearCache should work', async () => {
    await testCacheKey('testClearCache');

    clearCache('testClearCache');
    const hook2 = setup(request, {
      cacheKey: 'testClearCache',
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual(undefined);
  });

  it('setCache/getCache should work', async () => {
    const cacheKey = `setCacheKey`;
    await testCacheKey({
      cacheKey,
      setCache: (data) => localStorage.setItem(cacheKey, JSON.stringify(data)),
      getCache: () => JSON.parse(localStorage.getItem(cacheKey) || '{}'),
    });

    jest.advanceTimersByTime(1000);
    const hook2 = setup(request, {
      cacheKey,
      setCache: (data) => localStorage.setItem(cacheKey, JSON.stringify(data)),
      getCache: () => JSON.parse(localStorage.getItem(cacheKey) || '{}'),
    });
    expect(hook2.result.current.loading).toEqual(true);
    expect(hook2.result.current.data).toEqual('success');

    await act(async () => {
      jest.runAllTimers();
    });
    expect(hook2.result.current.loading).toEqual(false);
  });
});
