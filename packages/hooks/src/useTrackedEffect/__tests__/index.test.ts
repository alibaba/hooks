import { describe, expect, test, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useTrackedEffect from '../index';

describe('useTrackedEffect', () => {
  //We use a array to store which dependency has changed
  let changedDepIndexes = [];
  let prevDependencies = [];
  let currentDependencies = [];
  const mockEffectCleanup = vi.fn();
  const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);
  const mockEffectWithTracked = vi.fn().mockImplementation((changes, prevDeps, curDeps) => {
    //This effect callback accept an addition parameter which contains indexes of dependecies which changed their equalities.
    changedDepIndexes = changes;
    prevDependencies = prevDeps;
    currentDependencies = curDeps;
    return mockEffectCleanup;
  });

  beforeEach(() => {
    // Reset all mocks before each test
    mockEffectCleanup.mockClear();
    mockEffectCallback.mockClear();
    mockEffectWithTracked.mockClear();
    changedDepIndexes = [];
    prevDependencies = [];
    currentDependencies = [];
  });
  test("should run provided effect and return single changed dependecy's index ", () => {
    let var1 = 0;
    const var2 = '0';
    const var3 = { value: 0 };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    var1++;
    rerender();
    expect(changedDepIndexes).toHaveLength(1);
    expect(changedDepIndexes[0]).toBe(0);
  });
  test('should run provided effect and return correct dependencies (previous and current)', () => {
    let var1 = 0;
    let var2 = '0';
    const var3 = { value: 0 };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    var1++;
    var2 = '1';
    rerender();
    expect(prevDependencies[0]).toBe(0);
    expect(currentDependencies[0]).toBe(1);
    expect(prevDependencies[1] === '0').toBe(true);
    expect(currentDependencies[1] === '1').toBe(true);
    changedDepIndexes = [];
    var2 = '2';
    rerender();
    expect(prevDependencies[1]).toBe('1');
    expect(currentDependencies[1]).toBe('2');
  });
  test(" should run provided effect and return multiple changed dependecy's indexes", () => {
    let var1 = 0;
    let var2 = '0';
    const var3 = { value: 0 };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    var1++;
    var2 = '1';
    rerender();
    expect(changedDepIndexes).toHaveLength(2);
    expect(changedDepIndexes[0]).toBe(0);
    expect(changedDepIndexes[1]).toBe(1);
    changedDepIndexes = [];
    var2 = '2';
    rerender();
    expect(changedDepIndexes).toHaveLength(1);
    expect(changedDepIndexes[0]).toBe(1);
  });
  test('should run provided effect and return empty if no dependency changed', () => {
    let var1 = 0;
    const var2 = '0';
    const var3 = { value: 0 };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    var1 = 0;
    rerender();
    expect(changedDepIndexes).toHaveLength(0);
  });
  test('should run provided effect and make sure reference equality is correct', () => {
    const var1 = 0;
    const var2 = '0';
    const var3 = { value: 0 };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    var3.value = 123;
    rerender();
    expect(changedDepIndexes).toHaveLength(0);
  });

  test('should run clean-up provided on unmount as a normal useEffect', () => {
    const { unmount } = renderHook(() => useTrackedEffect(mockEffectCallback));
    expect(mockEffectCleanup).not.toHaveBeenCalled();

    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });
});
