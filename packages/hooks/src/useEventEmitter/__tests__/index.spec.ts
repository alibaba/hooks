import { useState } from 'react';
import { describe, expect, test } from 'vitest';
import { act, renderHook } from '../../utils/tests';
import useEventEmitter, { EventEmitter } from '../index';

describe('useEventEmitter', () => {
  test('moves subscriptions when the emitter prop changes', () => {
    const first = new EventEmitter<number>();
    const second = new EventEmitter<number>();
    const received: number[] = [];
    const { rerender, unmount } = renderHook(
      ({ emitter }) => emitter.useSubscription((value) => received.push(value)),
      { initialProps: { emitter: first } },
    );

    first.emit(1);
    expect(received).toEqual([1]);
    rerender({ emitter: second });
    first.emit(2);
    second.emit(3);
    expect(received).toEqual([1, 3]);

    unmount();
    second.emit(4);
    expect(received).toEqual([1, 3]);
  });

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

  test('emit and subscribe should work', () => {
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
