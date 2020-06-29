import { renderHook, act } from '@testing-library/react-hooks';
import useCookieState, { IOptions } from '../index';

describe('useCookieState', () => {
  it('should be defined', () => {
    expect(useCookieState).toBeDefined();
  });

  const setUp = <T>(key: string, options: IOptions<T>) =>
    renderHook(() => {
      const [state, setState] = useCookieState<T>(key, options);
      return {
        state,
        setState,
      } as const;
    });

  it('getKey should work', () => {
    const COOKIE_KEY = 'test-key';
    const hook = setUp(COOKIE_KEY, {
      defaultValue: 'A',
    });
    expect(hook.result.current.state).toEqual('A');
    act(() => {
      hook.result.current.setState('B');
    });
    expect(hook.result.current.state).toEqual('B');
    const anotherHook = setUp(COOKIE_KEY, {
      defaultValue: 'A',
    });
    expect(anotherHook.result.current.state).toEqual('B');
    act(() => {
      anotherHook.result.current.setState('C');
    });
    expect(anotherHook.result.current.state).toEqual('C');
    expect(hook.result.current.state).toEqual('B');
  });

  it('should support object', () => {
    const COOKIE_KEY = 'test-object-key';
    const hook = setUp<{ name: string }>(COOKIE_KEY, {
      defaultValue: {
        name: 'A',
      },
    });
    expect(hook.result.current.state).toEqual({ name: 'A' });
    act(() => {
      hook.result.current.setState({ name: 'B' });
    });
    expect(hook.result.current.state).toEqual({ name: 'B' });
    const anotherHook = setUp(COOKIE_KEY, {
      defaultValue: {
        name: 'C',
      },
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
    const COOKIE_KEY = 'test-number-key';
    const hook = setUp(COOKIE_KEY, {
      defaultValue: 1,
    });
    expect(hook.result.current.state).toEqual(1);
    act(() => {
      hook.result.current.setState(2);
    });
    expect(hook.result.current.state).toEqual(2);
    const anotherHook = setUp(COOKIE_KEY, {
      defaultValue: 3,
    });
    expect(anotherHook.result.current.state).toEqual(2);
    act(() => {
      anotherHook.result.current.setState(3);
    });
    expect(anotherHook.result.current.state).toEqual(3);
    expect(hook.result.current.state).toEqual(2);
  });

  it('should support boolean', () => {
    const COOKIE_KEY = 'test-boolean-key';
    const hook = setUp(COOKIE_KEY, {
      defaultValue: true,
    });
    expect(hook.result.current.state).toEqual(true);
    act(() => {
      hook.result.current.setState(false);
    });
    expect(hook.result.current.state).toEqual(false);
    const anotherHook = setUp(COOKIE_KEY, {
      defaultValue: true,
    });
    expect(anotherHook.result.current.state).toEqual(false);
    act(() => {
      anotherHook.result.current.setState(true);
    });
    expect(anotherHook.result.current.state).toEqual(true);
    expect(hook.result.current.state).toEqual(false);
  });

  it('should support null', () => {
    const COOKIE_KEY = 'test-boolean-key-with-null';
    const hook = setUp<boolean | null>(COOKIE_KEY, {
      defaultValue: false,
    });
    expect(hook.result.current.state).toEqual(false);
    act(() => {
      hook.result.current.setState(null);
    });
    expect(hook.result.current.state).toEqual(null);
    const anotherHook = setUp(COOKIE_KEY, {
      defaultValue: false,
    });
    expect(anotherHook.result.current.state).toEqual(null);
  });

  it('should support function updater', () => {
    const COOKIE_KEY = 'test-func-updater';
    const hook = setUp<string | null>(COOKIE_KEY, {
      defaultValue: 'hello world',
    });
    expect(hook.result.current.state).toEqual('hello world');
    act(() => {
      hook.result.current.setState((state) => `${state}, zhangsan`);
    });
    expect(hook.result.current.state).toEqual('hello world, zhangsan');
  });
});
