import { renderHook } from '@testing-library/react-hooks';
import useTrackedEffect from '../index';

describe('useTrackedEffect', () => {
  //We use a array to store which dependency has changed
  var changedDepIndexes = [];
  var prevDependencies = [];
  var currentDependencies = [];
  const mockEffectCleanup = jest.fn();
  const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);
  const mockEffectWithTracked = jest.fn().mockImplementation((changes, prevDeps, curDeps) => {
    //This effect callback accept an addition parameter which contains indexes of dependecies which changed their equalities.
    changedDepIndexes = changes;
    prevDependencies = prevDeps;
    currentDependencies = curDeps;
    return mockEffectCleanup;
  });
  it('should be defined', () => {
    expect(useTrackedEffect).toBeDefined();
  });
  it("should run provided effect and return single changed dependecy's index ", () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
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
    expect(changedDepIndexes[0]).toEqual(0);
  });
  it('should run provided effect and return correct dependencies (previous and current)', () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
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
    expect(prevDependencies[0]).toEqual(0);
    expect(currentDependencies[0]).toEqual(1);
    expect(prevDependencies[1] === '0').toEqual(true);
    expect(currentDependencies[1] === '1').toEqual(true);
    changedDepIndexes = [];
    var2 = '2';
    rerender();
    expect(prevDependencies[1]).toEqual('1');
    expect(currentDependencies[1]).toEqual('2');
  });
  it(" should run provided effect and return multiple changed dependecy's indexes", () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
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
    expect(changedDepIndexes[0]).toEqual(0);
    expect(changedDepIndexes[1]).toEqual(1);
    changedDepIndexes = [];
    var2 = '2';
    rerender();
    expect(changedDepIndexes).toHaveLength(1);
    expect(changedDepIndexes[0]).toEqual(1);
  });
  it('should run provided effect and return empty if no dependency changed', () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
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
  it('should run provided effect and make sure reference equality is correct', () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
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

  it('should run clean-up provided on unmount as a normal useEffect', () => {
    const { unmount } = renderHook(() => useTrackedEffect(mockEffectCallback));
    expect(mockEffectCleanup).not.toHaveBeenCalled();

    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });
});
