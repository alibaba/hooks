import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useSafeState from '../index';

describe('useSetState', () => {
  const setUp = <S>(initialValue: S | (() => S)) =>
    renderHook(() => {
      const [state, setState] = useSafeState(initialValue);
      return {
        state,
        setState,
      } as const;
    });

  test('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  test('should support update', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(5);
    });
    expect(hook.result.current.state).toBe(5);
  });

  test('should not support update when unmount', () => {
    const hook = setUp(0);
    hook.unmount();
    act(() => {
      hook.result.current.setState(5);
    });
    expect(hook.result.current.state).toBe(0);
  });
});
