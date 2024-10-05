import { renderHook, act } from '@testing-library/react';
import type { Options } from '../index';
import usePageCacheState from '../index';

describe('usePageCacheState', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const setUp = <T>(key: string, value: T, options?: Options<T>) =>
    renderHook(() => {
      const [state, setState, operations] = usePageCacheState<T>(key, {
        ...options,
        useStorageStateOptions: {
          defaultValue: value,
          ...options?.useStorageStateOptions,
        },
      });
      return {
        state,
        setState,
        operations,
      } as const;
    });

  it('getKey should work', () => {
    const LOCAL_STORAGE_KEY = 'test-key';
    const hook = setUp(LOCAL_STORAGE_KEY, 'A');
    expect(hook.result.current.state).toBe('A');
    act(() => {
      hook.result.current.setState('B');
    });
    expect(hook.result.current.state).toBe('B');
    const anotherHook = setUp(LOCAL_STORAGE_KEY, 'A');
    expect(anotherHook.result.current.state).toBe('B');
    act(() => {
      anotherHook.result.current.setState('C');
    });
    expect(anotherHook.result.current.state).toBe('C');
    expect(hook.result.current.state).toBe('B');
  });

  it('should support object', () => {
    const LOCAL_STORAGE_KEY = 'test-object-key';
    const hook = setUp<{ name: string }>(LOCAL_STORAGE_KEY, {
      name: 'A',
    });
    expect(hook.result.current.state).toEqual({ name: 'A' });
    act(() => {
      hook.result.current.setState({ name: 'B' });
    });
    expect(hook.result.current.state).toEqual({ name: 'B' });
    const anotherHook = setUp(LOCAL_STORAGE_KEY, {
      name: 'C',
    });
    expect(anotherHook.result.current.state).toEqual({ name: 'B' });
    act(() => {
      anotherHook.result.current.setState({
        name: 'C',
      });
    });
    expect(anotherHook.result.current.state).toEqual({ name: 'C' });
    expect(hook.result.current.state).toEqual({ name: 'B' });
  });

  it('should support number', () => {
    const LOCAL_STORAGE_KEY = 'test-number-key';
    const hook = setUp(LOCAL_STORAGE_KEY, 1);
    expect(hook.result.current.state).toBe(1);
    act(() => {
      hook.result.current.setState(2);
    });
    expect(hook.result.current.state).toBe(2);
    const anotherHook = setUp(LOCAL_STORAGE_KEY, 3);
    expect(anotherHook.result.current.state).toBe(2);
    act(() => {
      anotherHook.result.current.setState(3);
    });
    expect(anotherHook.result.current.state).toBe(3);
    expect(hook.result.current.state).toBe(2);
  });

  it('should support boolean', () => {
    const LOCAL_STORAGE_KEY = 'test-boolean-key';
    const hook = setUp(LOCAL_STORAGE_KEY, true);
    expect(hook.result.current.state).toBe(true);
    act(() => {
      hook.result.current.setState(false);
    });
    expect(hook.result.current.state).toBe(false);
    const anotherHook = setUp(LOCAL_STORAGE_KEY, true);
    expect(anotherHook.result.current.state).toBe(false);
    act(() => {
      anotherHook.result.current.setState(true);
    });
    expect(anotherHook.result.current.state).toBe(true);
    expect(hook.result.current.state).toBe(false);
  });

  it('should support null', () => {
    const LOCAL_STORAGE_KEY = 'test-boolean-key-with-null';
    const hook = setUp<boolean | null>(LOCAL_STORAGE_KEY, false);
    expect(hook.result.current.state).toBe(false);
    act(() => {
      hook.result.current.setState(null);
    });
    expect(hook.result.current.state).toBeNull();
    const anotherHook = setUp(LOCAL_STORAGE_KEY, false);
    expect(anotherHook.result.current.state).toBeNull();
  });

  it('should support function updater', () => {
    const LOCAL_STORAGE_KEY = 'test-func-updater';
    const hook = setUp<string | null>(LOCAL_STORAGE_KEY, 'hello world');
    expect(hook.result.current.state).toBe('hello world');
    act(() => {
      hook.result.current.setState((state) => `${state}, zhangsan`);
    });
    expect(hook.result.current.state).toBe('hello world, zhangsan');
  });

  it('should sync state when changes', async () => {
    const LOCAL_STORAGE_KEY = 'test-sync-state';
    const hook = setUp(LOCAL_STORAGE_KEY, 'foo', {
      useStorageStateOptions: { listenStorageChange: true },
    });
    const anotherHook = setUp(LOCAL_STORAGE_KEY, 'bar', {
      useStorageStateOptions: { listenStorageChange: true },
    });

    expect(hook.result.current.state).toBe('foo');
    expect(anotherHook.result.current.state).toBe('bar');

    act(() => hook.result.current.setState('baz'));
    expect(hook.result.current.state).toBe('baz');
    expect(anotherHook.result.current.state).toBe('baz');

    act(() => anotherHook.result.current.setState('qux'));
    expect(hook.result.current.state).toBe('qux');
    expect(anotherHook.result.current.state).toBe('qux');
  });

  it('expired and over count data should be cleared', async () => {
    const LOCAL_STORAGE_KEY = 'test-clear-data-key';
    let hook = setUp(LOCAL_STORAGE_KEY, 'A', { expire: 5 });
    const getRealityStorageKey = hook.result.current.operations.getRealityStorageKey;
    act(() => {
      hook.result.current.setState('B');
    });

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    hook.unmount();
    hook = setUp(LOCAL_STORAGE_KEY, 'A', { expire: 5 });
    // remove expired data and use default value
    expect(hook.result.current.state).toBe('A');
    hook.unmount();
    let secondHook = setUp(LOCAL_STORAGE_KEY, 'A2', {
      expire: 5,
      maxCount: 2,
      version: '2',
      subKey: 'test',
    });
    expect(JSON.parse(localStorage.getItem(getRealityStorageKey(LOCAL_STORAGE_KEY)) || '')).toBe(
      'A',
    );
    const thirdHook = setUp(LOCAL_STORAGE_KEY, 'A3', {
      expire: 5,
      maxCount: 2,
      version: '3',
      subKey: 'test3',
    });
    // remove over count data
    expect(localStorage.getItem(getRealityStorageKey(LOCAL_STORAGE_KEY))).toBe(null);

    act(() => {
      secondHook.result.current.setState('B2');
    });
    await act(async () => {
      jest.advanceTimersByTime(6000);
    });
    act(() => {
      thirdHook.result.current.setState('B3');
    });

    // remove other vesrions expired data
    expect(localStorage.getItem(getRealityStorageKey(LOCAL_STORAGE_KEY, '2', 'test'))).toBe(null);
    secondHook.unmount();
    secondHook = setUp(LOCAL_STORAGE_KEY, 'A2', {
      expire: 5,
      maxCount: 2,
      version: '2',
      subKey: 'test',
    });
    expect(secondHook.result.current.state).toBe('A2');
    expect(thirdHook.result.current.state).toBe('B3');

    const thirdHookOtherVersion = setUp(LOCAL_STORAGE_KEY, 'A3', {
      expire: 5,
      version: '4',
      subKey: 'test3',
    });

    // test delete all versions in a subKey
    let recorder = thirdHookOtherVersion.result.current.operations.storageStateRecorder || {};
    let versionsMap = recorder['test3'];
    expect(Object.keys(versionsMap).toString()).toBe('3,4');
    act(() => {
      thirdHookOtherVersion.result.current.operations.delete('test3');
    });
    recorder = thirdHookOtherVersion.result.current.operations.storageStateRecorder || {};
    versionsMap = recorder['test3'];
    // only keep own version
    expect(Object.keys(versionsMap || {}).toString()).toBe('4');

    // test `setStorageStateRecorder`
    act(() => {
      thirdHookOtherVersion.result.current.operations.setStorageStateRecorder({});
    });
    expect(
      Object.keys(
        thirdHookOtherVersion.result.current.operations.storageStateRecorder || {},
      ).toString(),
    ).toBe('');
  });
});
