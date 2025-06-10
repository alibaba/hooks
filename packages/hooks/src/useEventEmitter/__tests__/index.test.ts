import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useEventEmitter from '../index';

describe('useEventEmitter', () => {
  const setUp = () =>
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
    expect(hook.result.current.count).toBe(12);
    act(() => {
      hook.result.current.event$.emit(2);
    });
    expect(hook.result.current.count).toBe(26);
  });
});
