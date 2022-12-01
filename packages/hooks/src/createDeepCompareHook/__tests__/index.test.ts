import { act, renderHook } from '@testing-library/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createDeepCompareHook } from '../index';

describe('createDeepCompareHook', () => {
  it('should work for useEffect', async () => {
    const useDeepCompareEffect = createDeepCompareHook(useEffect);

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

  it('should work for useLayoutEffect', async () => {
    const useDeepCompareLayoutEffect = createDeepCompareHook(useLayoutEffect);

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

  it('deps is undefined should rerender in useEffect', async () => {
    const useDeepCompareLayoutEffect = createDeepCompareHook(useEffect);
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

  it('deps is undefined should rerender in useLayoutEffect', async () => {
    const useDeepCompareLayoutEffect = createDeepCompareHook(useLayoutEffect);
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
