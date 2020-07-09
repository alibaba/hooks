import { act, renderHook } from '@testing-library/react-hooks';
import useEasyReducer from '..';

describe('useEasyReducer', () => {
  it('should be defined', () => {
    expect(useEasyReducer).toBeDefined();
  });

  const initializer = () => ({ count: 0 });
  const processers = {
    increment(state: ReturnType<typeof initializer>) {
      return { count: state.count + 1 };
    },
    decrement(state: ReturnType<typeof initializer>) {
      return { count: state.count - 1 };
    },
    update(state: ReturnType<typeof initializer>, payload: number) {
      return { count: payload };
    },
  };

  it('should support initializer', () => {
    const hook = renderHook(() => {
      const [state, dispatcher] = useEasyReducer(processers, initializer);
      return {
        state,
        dispatcher,
      } as const;
    });

    expect(hook.result.current.state).toEqual({ count: 0 });
  });

  it('should support update', () => {
    const hook = renderHook(() => {
      const [state, dispatcher] = useEasyReducer(processers, initializer);
      return {
        state,
        dispatcher,
      } as const;
    });

    act(() => {
      hook.result.current.dispatcher.increment();
    });

    expect(hook.result.current.state).toEqual({ count: 1 });
  });
});
