import { act, renderHook } from '@testing-library/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { describe, expect, test } from 'vitest';
import { createDeepCompareEffect } from '../index';

describe('createDeepCompareEffect', () => {
  test('should work for useEffect', async () => {
    const useDeepCompareEffect = createDeepCompareEffect(useEffect);

    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({ foo: 'foo', bar: ['baz'] });
      useDeepCompareEffect(() => {
        setX((prevX) => prevX + 1);
      }, [y]);
      return { x, setY };
    });

    expect(hook.result.current.x).toBe(1);

    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['baz'] });
    });

    expect(hook.result.current.x).toBe(1);

    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['bazz'] });
    });

    expect(hook.result.current.x).toBe(2);
  });

  test('should work for useLayoutEffect', async () => {
    const useDeepCompareLayoutEffect = createDeepCompareEffect(useLayoutEffect);

    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({ foo: 'foo', bar: ['baz'] });
      useDeepCompareLayoutEffect(() => {
        setX((prevX) => prevX + 1);
      }, [y]);
      return { x, setY };
    });

    expect(hook.result.current.x).toBe(1);

    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['baz'] });
    });

    expect(hook.result.current.x).toBe(1);

    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['bazz'] });
    });

    expect(hook.result.current.x).toBe(2);
  });

  test('deps is undefined should rerender in useEffect', async () => {
    const useDeepCompareLayoutEffect = createDeepCompareEffect(useEffect);
    let count = 0;
    const hook = renderHook(() => {
      useDeepCompareLayoutEffect(() => {
        count++;
      });
    });

    expect(count).toBe(1);
    hook.rerender();
    expect(count).toBe(2);
    hook.rerender();
    expect(count).toBe(3);
  });

  test('deps is undefined should rerender in useLayoutEffect', async () => {
    const useDeepCompareLayoutEffect = createDeepCompareEffect(useLayoutEffect);
    let count = 0;
    const hook = renderHook(() => {
      useDeepCompareLayoutEffect(() => {
        count++;
      });
    });

    expect(count).toBe(1);
    hook.rerender();
    expect(count).toBe(2);
    hook.rerender();
    expect(count).toBe(3);
  });
});
