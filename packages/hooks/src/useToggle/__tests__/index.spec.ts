import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useToggle from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

describe('useToggle', () => {
  test('test on init', async () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current[0]).toBeFalsy();
  });

  test('test on methods', async () => {
    const hook = renderHook(() => useToggle('Hello'));
    expect(hook.result.current[0]).toBe('Hello');
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();
    act(() => {
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toBe('Hello');
    act(() => {
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBeFalsy();
  });

  test('stores function values without invoking them', () => {
    const left = vi.fn(() => 'left');
    const right = vi.fn(() => 'right');
    const replacement = vi.fn(() => 'replacement');
    const { result } = renderHook(() => useToggle(left, right));
    const { set, setLeft, setRight, toggle } = result.current[1];

    expect(result.current[0]).toBe(left);
    act(() => toggle());
    expect(result.current[0]).toBe(right);
    act(() => setLeft());
    expect(result.current[0]).toBe(left);
    act(() => setRight());
    expect(result.current[0]).toBe(right);
    act(() => set(replacement));
    expect(result.current[0]).toBe(replacement);
    expect(left).not.toHaveBeenCalled();
    expect(right).not.toHaveBeenCalled();
    expect(replacement).not.toHaveBeenCalled();
  });

  test('test on optional', () => {
    const hook = renderHook(() => useToggle('Hello', 'World'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('World');
    act(() => {
      hook.result.current[1].set('World');
    });
    expect(hook.result.current[0]).toBe('World');
    callToggle(hook);
    expect(hook.result.current[0]).toBe('Hello');
  });
});
