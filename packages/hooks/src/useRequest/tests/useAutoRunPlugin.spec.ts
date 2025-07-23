import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { request } from '../../utils/testingHelpers';
import useRequest from '../index';

describe('useAutoRunPlugin', () => {
  vi.useFakeTimers();

  const setUp = <TData = string, TParams extends any[] = any[]>(
    service: (...args: TParams) => Promise<TData>,
    options?: Parameters<typeof useRequest<TData, TParams>>[1],
  ) => renderHook((o) => useRequest<TData, TParams>(service, o || options));

  let hook: RenderHookResult<any, any>;

  test('useAutoRunPlugin ready should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useAutoRunPlugin manual=false ready=true work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: true,
      });
    });

    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: false,
    });
    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: true,
    });

    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useAutoRunPlugin manual=false ready=false work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: false,
      });
    });

    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: true,
    });

    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: false,
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useAutoRunPlugin manual=false ready&defaultParams work fine', async () => {
    act(() => {
      hook = setUp<string, [number]>(request, {
        ready: false,
        defaultParams: [1],
      });
    });

    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: true,
      defaultParams: [2],
    });

    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.params).toEqual([2]);

    hook.rerender({
      ready: false,
      defaultParams: [2],
    });
    hook.rerender({
      ready: true,
      defaultParams: [3],
    });

    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.params).toEqual([3]);
  });

  test('useAutoRunPlugin manual=true ready work fine', async () => {
    act(() => {
      hook = setUp(request, {
        ready: false,
        manual: true,
      });
    });
    expect(hook.result.current.loading).toBe(false);
    act(() => {
      hook.result.current.run();
    });
    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: true,
      manual: true,
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      hook.result.current.run();
    });
    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useAutoRunPlugin manual=false refreshDeps should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useAutoRunPlugin manual=true refreshDeps should work', async () => {
    let dep = 1;
    act(() => {
      hook = setUp(request, {
        manual: true,
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toBe(false);

    dep = 2;
    hook.rerender({
      manual: true,
      refreshDeps: [dep],
    });
    expect(hook.result.current.loading).toBe(false);
  });

  test('useAutoRunPlugin refreshDepsAction should work', async () => {
    let dep = 1;
    let count = 0;
    const refreshDepsAction = () => {
      count += 1;
    };
    act(() => {
      hook = setUp(request, {
        refreshDeps: [dep],
        refreshDepsAction,
      });
    });
    expect(hook.result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
      refreshDepsAction,
    });
    expect(hook.result.current.loading).toBe(false);
    expect(count).toBe(1);

    hook.rerender({
      refreshDeps: [dep],
      refreshDepsAction,
    });
    expect(hook.result.current.loading).toBe(false);
    expect(count).toBe(1);

    dep = 3;
    hook.rerender({
      refreshDeps: [dep],
      refreshDepsAction,
    });
    expect(hook.result.current.loading).toBe(false);
    expect(count).toBe(2);
  });

  test('useAutoRunPlugin ready & refreshDeps change same time work fine', async () => {
    const fn = vi.fn();

    const asyncFn = () => {
      return new Promise<string>((resolve) => {
        fn();
        return resolve('success');
      });
    };

    act(() => {
      hook = setUp<string, [number]>(asyncFn, {
        ready: false,
        defaultParams: [1],
        refreshDeps: [1],
      });
    });

    expect(hook.result.current.loading).toBe(false);

    hook.rerender({
      ready: true,
      defaultParams: [2],
      refreshDeps: [2],
    });
    expect(hook.result.current.loading).toBe(true);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.params).toEqual([2]);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
