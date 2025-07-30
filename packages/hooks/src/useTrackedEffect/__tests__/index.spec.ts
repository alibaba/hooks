import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import useTrackedEffect from '../index';

describe('useTrackedEffect', () => {
  //We use a array to store which dependency has changed
  let changedDepIndexes: number[] = [];
  let prevDependencies: any[] = [];
  let currentDependencies: any[] = [];
  let mockEffectCleanup: any;
  let mockEffectCallback: any;
  let mockEffectWithTracked: any;

  beforeEach(() => {
    changedDepIndexes = [];
    prevDependencies = [];
    currentDependencies = [];
    mockEffectCleanup = vi.fn();
    mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);
    mockEffectWithTracked = vi.fn().mockImplementation((changes, prevDeps, curDeps) => {
      //This effect callback accept an addition parameter which contains indexes of dependencies which changed their equalities.
      changedDepIndexes = changes;
      prevDependencies = prevDeps;
      currentDependencies = curDeps;
      return mockEffectCleanup;
    });
  });

  test("should run provided effect and return single changed dependency's index ", () => {
    const deps = { var1: 0, var2: '0', var3: { value: 0 } };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [deps.var1, deps.var2, deps.var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    deps.var1++;
    rerender();
    expect(changedDepIndexes).toHaveLength(1);
    expect(changedDepIndexes[0]).toBe(0);
  });
  test('should run provided effect and return correct dependencies (previous and current)', () => {
    const deps = { var1: 0, var2: '0', var3: { value: 0 } };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [deps.var1, deps.var2, deps.var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    deps.var1++;
    deps.var2 = '1';
    rerender();
    expect(prevDependencies[0]).toBe(0);
    expect(currentDependencies[0]).toBe(1);
    expect(prevDependencies[1] === '0').toBe(true);
    expect(currentDependencies[1] === '1').toBe(true);
    changedDepIndexes = [];
    deps.var2 = '2';
    rerender();
    expect(prevDependencies[1]).toBe('1');
    expect(currentDependencies[1]).toBe('2');
  });
  test(" should run provided effect and return multiple changed dependecy's indexes", () => {
    const deps = { var1: 0, var2: '0', var3: { value: 0 } };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [deps.var1, deps.var2, deps.var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    deps.var1++;
    deps.var2 = '1';
    rerender();
    expect(changedDepIndexes).toHaveLength(2);
    expect(changedDepIndexes[0]).toBe(0);
    expect(changedDepIndexes[1]).toBe(1);
    changedDepIndexes = [];
    deps.var2 = '2';
    rerender();
    expect(changedDepIndexes).toHaveLength(1);
    expect(changedDepIndexes[0]).toBe(1);
  });
  test('should run provided effect and return empty if no dependency changed', () => {
    const deps = { var1: 0, var2: '0', var3: { value: 0 } };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [deps.var1, deps.var2, deps.var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    deps.var1 = 0;
    rerender();
    expect(changedDepIndexes).toHaveLength(0);
  });
  test('should run provided effect and make sure reference equality is correct', () => {
    const deps = { var1: 0, var2: '0', var3: { value: 0 } };
    const { rerender } = renderHook(() =>
      useTrackedEffect(mockEffectWithTracked, [deps.var1, deps.var2, deps.var3]),
    );
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDepIndexes).toHaveLength(3);
    changedDepIndexes = [];
    deps.var3.value = 123;
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
