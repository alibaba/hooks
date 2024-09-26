import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useEventEmitter from '../index';

describe('useEventEmitter', () => {
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
      event$.useSubscription(async (val) => {
        setCount((c) => c + val + 10);
      }, 'async');
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

  it('asyncEmit and subscribe should work', async () => {
    const hook = setUp();
    await act(async () => {
      await hook.result.current.event$.asyncEmit(1, 'async');
    });
    expect(hook.result.current.count).toBe(11);
    await act(async () => {
      await hook.result.current.event$.asyncEmit(2, 'async');
    });
    expect(hook.result.current.count).toBe(23);
  });
});
