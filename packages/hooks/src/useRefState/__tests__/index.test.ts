import { renderHook, act } from '@testing-library/react';
import useRefState from '../index';

describe('useRefState', () => {
  const setUp = <T>(initialValue: T) =>
    renderHook(() => {
      const [state, setState, getState] = useRefState<T>(initialValue);
      return {
        state,
        setState,
        getState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp(() => 0);
    expect(hook.result.current.state).toBe(0);
  });

  it('should support update', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState()).toBe(1);
  });

  it('should getState frozen', () => {
    const hook = setUp(0);
    const prevGetState = hook.result.current.getState;
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState).toBe(prevGetState);
  });
});
