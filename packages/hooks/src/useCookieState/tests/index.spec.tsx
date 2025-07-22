import { act, renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';
import { describe, expect, test } from 'vitest';
import type { Options } from '../index';
import useCookieState from '../index';

describe('useCookieState', () => {
  const setUp = (key: string, options: Options) =>
    renderHook(() => {
      const [state, setState] = useCookieState(key, options);
      return {
        state,
        setState,
      } as const;
    });

  test('getKey should work', () => {
    const COOKIE = 'test-key';
    const hook = setUp(COOKIE, {
      defaultValue: 'A',
    });
    expect(hook.result.current.state).toBe('A');
    act(() => {
      hook.result.current.setState('B');
    });
    expect(hook.result.current.state).toBe('B');
    const anotherHook = setUp(COOKIE, {
      defaultValue: 'A',
    });
    expect(anotherHook.result.current.state).toBe('B');
    act(() => {
      anotherHook.result.current.setState('C');
    });
    expect(anotherHook.result.current.state).toBe('C');
    expect(hook.result.current.state).toBe('B');
    expect(Cookies.get(COOKIE)).toBe('C');
  });

  test('should support undefined', () => {
    const COOKIE = 'test-boolean-key-with-undefined';
    const hook = setUp(COOKIE, {
      defaultValue: 'undefined',
    });
    expect(hook.result.current.state).toBe('undefined');
    act(() => {
      hook.result.current.setState(undefined);
    });
    expect(hook.result.current.state).toBeUndefined();
    const anotherHook = setUp(COOKIE, {
      defaultValue: 'false',
    });
    expect(anotherHook.result.current.state).toBe('false');
    expect(Cookies.get(COOKIE)).toBeUndefined();
    act(() => {
      // @ts-ignore
      hook.result.current.setState();
    });
    expect(hook.result.current.state).toBeUndefined();
    expect(Cookies.get(COOKIE)).toBeUndefined();
  });

  test('should support empty string', () => {
    Cookies.set('test-key-empty-string', '');
    expect(Cookies.get('test-key-empty-string')).toBe('');
    const COOKIE = 'test-key-empty-string';
    const hook = setUp(COOKIE, {
      defaultValue: 'hello',
    });
    expect(hook.result.current.state).toBe('');
  });

  test('should support function updater', () => {
    const COOKIE = 'test-func-updater';
    const hook = setUp(COOKIE, {
      defaultValue: () => 'hello world',
    });
    expect(hook.result.current.state).toBe('hello world');
    act(() => {
      hook.result.current.setState((state) => `${state}, zhangsan`);
    });
    expect(hook.result.current.state).toBe('hello world, zhangsan');
  });

  test('using the same cookie name', () => {
    const COOKIE_NAME = 'test-same-cookie-name';
    const { result: result1 } = setUp(COOKIE_NAME, { defaultValue: 'A' });
    const { result: result2 } = setUp(COOKIE_NAME, { defaultValue: 'B' });
    expect(result1.current.state).toBe('A');
    expect(result2.current.state).toBe('B');
    act(() => {
      result1.current.setState('C');
    });
    expect(result1.current.state).toBe('C');
    expect(result2.current.state).toBe('B');
    expect(Cookies.get(COOKIE_NAME)).toBe('C');
    act(() => {
      result2.current.setState('D');
    });
    expect(result1.current.state).toBe('C');
    expect(result2.current.state).toBe('D');
    expect(Cookies.get(COOKIE_NAME)).toBe('D');
  });
});
