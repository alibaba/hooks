import { act, renderHook } from '@testing-library/react';
import { createSharedState } from '../index';

describe('createSharedState', () => {
  const setUp = () =>
    renderHook(() => {
      const useCount = createSharedState(0);
      return useCount();
    });

  it('should support initialValue', () => {
    const hook = setUp();
    expect(hook.result.current[0]).toEqual(0);
  });

  it('should support normal update', () => {
    const hook = setUp();
    act(() => {
      hook.result.current[1](1);
    });
    expect(hook.result.current[0]).toEqual(1);
  });

  it('should support function update', () => {
    const hook = setUp();
    act(() => {
      hook.result.current[1]((prev) => prev + 1);
    });
    expect(hook.result.current[0]).toEqual({ count: 1 });
  });
});
