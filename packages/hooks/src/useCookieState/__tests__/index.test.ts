import { renderHook, act } from '@testing-library/react-hooks';
import useCookieState, { IOptions } from '../index';
import Cookies from 'js-cookie';

describe('useCookieState', () => {
  it('should be defined', () => {
    expect(useCookieState).toBeDefined();
  });

  const setUp = (key: string, options: IOptions) =>
    renderHook(() => {
      const [state, setState] = useCookieState(key, options);
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

  it('should support null', () => {
    const COOKIE_KEY = 'test-boolean-key-with-null';
    const hook = setUp(COOKIE_KEY, {
      defaultValue: 'null',
    });
    expect(hook.result.current.state).toEqual('null');
    act(() => {
      hook.result.current.setState(null);
    });
    expect(hook.result.current.state).toEqual(null);
    const anotherHook = setUp(COOKIE_KEY, {
      defaultValue: 'false',
    });
    expect(anotherHook.result.current.state).toEqual('false');
  });

  it('should support empty string', () => {
    Cookies.set('test-key-empty-string', '');
    expect(Cookies.get('test-key-empty-string')).toBe('');
    const COOKIE_KEY = 'test-key-empty-string';
    const hook = setUp(COOKIE_KEY, {
      defaultValue: 'hello',
    });
    expect(hook.result.current.state).toEqual('');
  });

  it('should support function updater', () => {
    const COOKIE_KEY = 'test-func-updater';
    const hook = setUp(COOKIE_KEY, {
      defaultValue: () => 'hello world',
    });
    expect(hook.result.current.state).toEqual('hello world');
    act(() => {
      hook.result.current.setState((state) => `${state}, zhangsan`);
    });
    expect(hook.result.current.state).toEqual('hello world, zhangsan');
  });
});
