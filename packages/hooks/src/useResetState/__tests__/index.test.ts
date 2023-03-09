import { act, renderHook } from '@testing-library/react';
import useResetState from '../index';

describe('useResetState', () => {
  const setUp = <S>(initialState: S) =>
    renderHook(() => {
      const [state, setState, resetState] = useResetState<S>(initialState);

      return {
        state,
        setState,
        resetState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('should reset state', () => {
    const hook = setUp({
      hello: '',
      count: 0,
    });

    act(() => {
      hook.result.current.setState({
        hello: 'world',
        count: 1,
      });
    });

    act(() => {
      hook.result.current.resetState();
    });

    expect(hook.result.current.state).toEqual({ hello: '', count: 0 });
  });

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    });
    act(() => {
      hook.result.current.setState((prev) => ({ count: prev.count + 1 }));
    });
    expect(hook.result.current.state).toEqual({ count: 1 });
  });
});
