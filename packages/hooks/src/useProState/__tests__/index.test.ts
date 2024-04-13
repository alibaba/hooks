import { renderHook, act } from '@testing-library/react';
import useProState from '../index';

describe('useProState', () => {
  const setUp = <T>(initialValue: T) =>
    renderHook(() => {
      const [state, { setState, getState, resetState, setMergeState }] =
        useProState<T>(initialValue);
      return {
        state,
        setState,
        getState,
        resetState,
        setMergeState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp(0);
    expect(hook.result.current.state).toBe(0);
  });

  it('should support function initialValue', () => {
    const hook = setUp(() => 0);
    expect(hook.result.current.state).toBe(0);
  });

  it('should support update', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.state).toBe(1);
  });

  it('should support function update', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState((prev) => prev + 1);
    });
    expect(hook.result.current.state).toBe(1);
  });

  it('should support get latest value', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState()).toBe(1);
  });

  it('should support frozen', () => {
    const hook = setUp(0);
    const prevGetState = hook.result.current.getState;
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState).toBe(prevGetState);
  });

  it('should keep random initialValue', () => {
    const random = Math.random();
    const hook = setUp(random);
    act(() => {
      hook.result.current.setState(Math.random());
      hook.result.current.resetState();
    });
    expect(hook.result.current.state).toBe(random);
  });

  it('should keep random function initialValue', () => {
    const random = Math.random();
    const hook = setUp(() => random);
    act(() => {
      hook.result.current.setState(() => Math.random());
      hook.result.current.resetState();
    });
    expect(hook.result.current.state).toBe(random);
  });

  it('should support setMergeState', () => {
    const hook = setUp<{ hello?: string; foo?: string }>({
      hello: 'world',
    });
    act(() => {
      hook.result.current.setMergeState({ foo: 'bar' });
    });
    expect(hook.result.current.state).toEqual({ hello: 'world', foo: 'bar' });
  });
});
