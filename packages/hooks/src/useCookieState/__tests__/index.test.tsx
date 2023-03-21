import React, { useState } from 'react';
import { renderHook, act, render, fireEvent } from '@testing-library/react';
import useCookieState from '../index';
import type { Options } from '../index';
import Cookies from 'js-cookie';

describe('useCookieState', () => {
  const setUp = (key: string, options: Options) =>
    renderHook(() => {
      const [state, setState] = useCookieState(key, options);
      return {
        state,
        setState,
      } as const;
    });

  it('defaultValue should work', () => {
    const COOKIE = {
      KEY: 'test-key-with-default-value',
      KEY2: 'test-key-with-default-value2',
      DEFAULT_VALUE: 'A',
      DEFAULT_VALUE2: 'A2',
    };
    const Setup = () => {
      const [key, setKey] = useState<string>(COOKIE.KEY);
      const [defaultValue, setDefaultValue] = useState<string>(COOKIE.DEFAULT_VALUE);
      const [state] = useCookieState(key, { defaultValue });

      return (
        <>
          <div role="state">{state}</div>
          <button
            role="button"
            onClick={() => {
              setKey(COOKIE.KEY2);
              setDefaultValue(COOKIE.DEFAULT_VALUE2);
            }}
          />
        </>
      );
    };
    const wrap = render(<Setup />);

    // Initial value
    expect(wrap.getByRole('state').textContent).toBe(COOKIE.DEFAULT_VALUE);
    expect(Cookies.get(COOKIE.KEY)).toBe(COOKIE.DEFAULT_VALUE);

    // Change `key` and `defaultValue`
    act(() => fireEvent.click(wrap.getByRole('button')));
    expect(Cookies.get(COOKIE.KEY)).toBe(COOKIE.DEFAULT_VALUE);
    expect(Cookies.get(COOKIE.KEY2)).toBe(COOKIE.DEFAULT_VALUE2);
  });

  it('getKey should work', () => {
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

  it('should support undefined', () => {
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
    expect(Cookies.get(COOKIE)).toBe('false');
    act(() => {
      // @ts-ignore
      hook.result.current.setState();
    });
    expect(hook.result.current.state).toBeUndefined();
    expect(Cookies.get(COOKIE)).toBeUndefined();
  });

  it('should support empty string', () => {
    Cookies.set('test-key-empty-string', '');
    expect(Cookies.get('test-key-empty-string')).toBe('');
    const COOKIE = 'test-key-empty-string';
    const hook = setUp(COOKIE, {
      defaultValue: 'hello',
    });
    expect(hook.result.current.state).toBe('');
  });

  it('should support function updater', () => {
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

  it('using the same cookie name', () => {
    const COOKIE_NAME = 'test-same-cookie-name';
    const { result: result1 } = setUp(COOKIE_NAME, { defaultValue: 'A' });
    const { result: result2 } = setUp(COOKIE_NAME, { defaultValue: 'B' });
    expect(result1.current.state).toBe('A');
    expect(result2.current.state).toBe('A');
    act(() => {
      result1.current.setState('B');
    });
    expect(result1.current.state).toBe('B');
    expect(result2.current.state).toBe('A');
    expect(Cookies.get(COOKIE_NAME)).toBe('B');
    act(() => {
      result2.current.setState('C');
    });
    expect(result1.current.state).toBe('B');
    expect(result2.current.state).toBe('C');
    expect(Cookies.get(COOKIE_NAME)).toBe('C');
  });
});
