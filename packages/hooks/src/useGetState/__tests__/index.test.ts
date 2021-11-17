import { act, renderHook } from '@testing-library/react-hooks';
import useGetState from '../index';

describe('useGetState', () => {
  it('should be defined', () => {
    expect(useGetState).toBeDefined();
  });

  const setUp = <T>(initialValue: T) =>
    renderHook(() => {
      const [state, setState, getState] = useGetState<T>(initialValue);
      return {
        state,
        setState,
        getState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp(() => 0);
    expect(hook.result.current.state).toEqual(0);
  });

  it('should support update', () => {
    const hook = setUp(0);
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState()).toEqual(1);
  });

  it('should getState frozen', () => {
    const hook = setUp(0);
    const prevGetState = hook.result.current.getState;
    act(() => {
      hook.result.current.setState(1);
    });
    expect(hook.result.current.getState).toEqual(prevGetState);
  });
});
