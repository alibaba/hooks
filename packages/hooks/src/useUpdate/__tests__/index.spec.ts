import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useMemoizedFn from '../../useMemoizedFn';
import useUpdate from '..';

describe('useUpdate', () => {
  test('should update', () => {
    let count = 0;
    const hooks = renderHook(() => {
      const update = useUpdate();
      return {
        update,
        count,
        onChange: useMemoizedFn(() => {
          count++;
          update();
        }),
      };
    });
    expect(hooks.result.current.count).toBe(0);
    act(hooks.result.current.onChange);
    expect(hooks.result.current.count).toBe(1);
  });
  test('should return same update function', () => {
    const hooks = renderHook(() => useUpdate());
    const preUpdate = hooks.result.current;
    hooks.rerender();
    expect(hooks.result.current).toEqual(preUpdate);
  });
});
