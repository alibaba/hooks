import { act, renderHook } from '@testing-library/react';
import useSetState from '../index';

describe('useSetState', () => {
  const setUp = <T extends object>(initialValue: T) =>
    renderHook(() => {
      const [state, setMergeState, setState] = useSetState<T>(initialValue);
      return {
        state,
        setMergeState,
        setState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('should support object', () => {
    const hook = setUp<any>({
      hello: 'world',
    });
    act(() => {
      hook.result.current.setMergeState({ foo: 'bar' });
    });
    expect(hook.result.current.state).toEqual({ hello: 'world', foo: 'bar' });
  });

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    });
    act(() => {
      hook.result.current.setMergeState((prev) => ({ count: prev.count + 1 }));
    });
    expect(hook.result.current.state).toEqual({ count: 1 });
  });

  it('should support set state', () => {
    const hook = setUp<{
      a?: number,
      b?: number,
    }>({
      a: 0,
      b: 0,
    });

    act(() => {
      hook.result.current.setState({ b: 0 });
    });
    expect(hook.result.current.state).toEqual({ b: 0 });
  });
});
