import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import type { Options } from '../index';
import useCounter from '../index';

const setUp = (init?: number, options?: Options) => renderHook(() => useCounter(init, options));

describe('useCounter', () => {
  test('should init counter', () => {
    const { result } = setUp(100);
    const [current] = result.current;
    expect(current).toBe(100);
  });

  test('should max, min, actions work', () => {
    const { result } = setUp(100, { max: 10, min: 1 });
    const [current, { inc, dec, reset, set }] = result.current;
    expect(current).toBe(10);
    act(() => {
      inc(1);
    });
    expect(result.current[0]).toBe(10);
    act(() => {
      dec(100);
    });
    expect(result.current[0]).toBe(1);
    act(() => {
      inc();
    });
    expect(result.current[0]).toBe(2);
    act(() => {
      reset();
    });
    expect(result.current[0]).toBe(10);
    act(() => {
      set(-1000);
    });
    expect(result.current[0]).toBe(1);
    act(() => {
      set((c) => c + 2);
    });
    expect(result.current[0]).toBe(3);

    act(() => {
      inc();
      inc();
      inc();
    });
    expect(result.current[0]).toBe(6);
  });
});
