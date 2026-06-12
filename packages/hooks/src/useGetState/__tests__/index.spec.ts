import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useGetState from '../index';

describe('useGetState', () => {
  const setUp = <T>(initialValue: T) =>
    renderHook(() => {
      const [state, setState, getState] = useGetState<T>(initialValue);
      return {
        state,
        setState,
        getState,
      } as const;
    });

  test('should support initialValue', () => {
    const hook = setUp(() => 0);
    expect(hook.result.current.state).toBe(0);
  });

  test('should support update', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState()).toBe(1);
  });

  test('should getState frozen', () => {
    const hook = setUp(0);
    const prevGetState = hook.result.current.getState;
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState).toBe(prevGetState);
  });
});
