import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useEventTarget from '../index';

describe('useEventTarget', () => {
  test('should work without initial value', async () => {
    const hook = renderHook(() => useEventTarget());
    expect(hook.result.current[0]).toBeUndefined();
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'abc' } });
    });
    expect(hook.result.current[0]).toBe('abc');
  });

  test('should work with initial value', async () => {
    const hook = renderHook(() => useEventTarget({ initialValue: 'abc' }));
    expect(hook.result.current[0]).toBe('abc');
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'def' } });
    });
    expect(hook.result.current[0]).toBe('def');
    act(() => {
      hook.result.current[1].reset();
    });
    expect(hook.result.current[0]).toBe('abc');
  });

  test('should work with transformer', () => {
    const hook = renderHook(() =>
      useEventTarget({
        transformer: (str: string) => str.toUpperCase(),
      }),
    );

    expect(hook.result.current[0]).toBeUndefined();
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'def' } });
    });
    expect(hook.result.current[0]).toBe('DEF');
  });

  test('should be able to transform to any type', () => {
    const hook = renderHook(() =>
      useEventTarget<string, number>({
        transformer: (num: number) => String(num),
      }),
    );
    expect(hook.result.current[0]).toBeUndefined();
    act(() => {
      hook.result.current[1].onChange({ target: { value: 123 } });
    });
    expect(hook.result.current[0]).toBe('123');
  });
});
