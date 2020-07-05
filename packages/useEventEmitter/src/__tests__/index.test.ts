import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import useEventEmitter from '../index';

describe('useEventEmitter', () => {
  it('should be defined', () => {
    expect(useEventEmitter).toBeDefined();
  });

  const setUp = (): any =>
    renderHook(() => {
      const event$ = useEventEmitter<number>();
      const [count, setCount] = useState(0);
      event$.useSubscription((val) => {
        setCount((c) => c + val);
      });
      event$.useSubscription((val) => {
        setCount((c) => c + val + 10);
      });
      return {
        event$,
        count,
      };
    });

  it('emit and subscribe should work', () => {
    const hook = setUp();
    act(() => {
      hook.result.current.event$.emit(1);
    });
    expect(hook.result.current.count).toEqual(12);
    act(() => {
      hook.result.current.event$.emit(2);
    });
    expect(hook.result.current.count).toEqual(26);
  });
});
