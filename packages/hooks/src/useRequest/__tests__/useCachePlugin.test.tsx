import { act, renderHook, waitFor } from '@testing-library/react';
import { render } from '@testing-library/react';
import useRequest, { clearCache } from '../index';
import { request } from '../../utils/testingHelpers';
import React, { useState } from 'react';
import 'jest-localstorage-mock';

describe('useCachePlugin', () => {
  jest.useFakeTimers();

  const setup = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook(() => useRequest(service, options));

  const testCacheKey = async (options: any) => {
    const hook = setup(request, options);
    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.data).toBe('success');
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
    expect(hook2.result.current.loading).toBe(true);
    expect(hook2.result.current.data).toBe('success');
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(hook2.result.current.loading).toBe(false);
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
    expect(hook2.result.current.loading).toBe(false);
    expect(hook2.result.current.data).toBe('success');
    hook2.unmount();

    jest.advanceTimersByTime(3001);

    const hook3 = setup(request, {
      cacheKey: 'testStaleTime',
      staleTime: 3000,
    });
    expect(hook3.result.current.loading).toBe(true);
    expect(hook3.result.current.data).toBe('success');

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(hook3.result.current.loading).toBe(false);
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
    expect(hook2.result.current.loading).toBe(true);
    expect(hook2.result.current.data).toBe('success');
    hook2.unmount();

    jest.advanceTimersByTime(5001);

    const hook3 = setup(request, {
      cacheKey: 'testCacheTime',
      cacheTime: 5000,
    });
    expect(hook3.result.current.loading).toBe(true);
    expect(hook3.result.current.data).toBeUndefined();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(hook3.result.current.loading).toBe(false);
    expect(hook3.result.current.data).toBe('success');
  });

  it('clearCache should work', async () => {
    await testCacheKey('testClearCache');

    clearCache('testClearCache');
    const hook2 = setup(request, {
      cacheKey: 'testClearCache',
    });
    expect(hook2.result.current.loading).toBe(true);
    expect(hook2.result.current.data).toBeUndefined();
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
    expect(hook2.result.current.loading).toBe(true);
    expect(hook2.result.current.data).toBe('success');

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(hook2.result.current.loading).toBe(false);
  });

  it('cache should work when change data immediately', async () => {
    const { result } = setup(request, {
      cacheKey: 'mutateCacheKey',
    });
    act(() => {
      result.current.mutate(1);
    });
    expect(result.current.data).toBe(1);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('success');
  });

  //github.com/alibaba/hooks/issues/1859
  it('error should reset with activeKey', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    let res = {} as any;
    const TestComponent = () => {
      const [key, setKey] = useState<number>(1);
      const { data, error } = useRequest(() => request(key), {
        refreshDeps: [key],
        cacheKey: String(key),
        staleTime: 300000,
      });
      res = {
        data,
        error,
        setKey,
      };
      return null;
    };

    render(<TestComponent />);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(res.error).toBeUndefined();

    act(() => res.setKey(0));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(errSpy).toBeCalled();
    await waitFor(() => expect(res.error).not.toBeUndefined());

    act(() => res.setKey(1));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(res.error).toBeUndefined();

    errSpy.mockRestore();
  });
});
