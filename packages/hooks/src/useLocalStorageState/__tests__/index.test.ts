import { renderHook, act } from '@testing-library/react';
import useLocalStorageState from '../index';

describe('useLocalStorageState', () => {
  const setUp = <T>(key: string, value: T) =>
    renderHook(() => {
      const [state, setState] = useLocalStorageState<T>(key, { defaultValue: value });
      return {
        state,
        setState,
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
});
