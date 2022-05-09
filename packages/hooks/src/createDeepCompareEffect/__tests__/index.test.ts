import { act, renderHook } from '@testing-library/react-hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createDeepCompareEffect } from '../index';

describe('createDeepCompareEffect', () => {
  it('should be defined', () => {
    expect(createDeepCompareEffect).toBeDefined();
  });

  it('should work for useEffect', async () => {
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

  it('should work for useLayoutEffect', async () => {
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
});
