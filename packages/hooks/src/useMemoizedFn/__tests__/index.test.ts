import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useState } from 'react';
import useMemoizedFn from '../';

const useCount = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((c) => c + 1);
  };

  const persistFn = useMemoizedFn(() => count);

  return { addCount, persistFn };
};

let hook: RenderHookResult<[], ReturnType<typeof useCount>>;

describe('useMemoizedFn', () => {
  it('should be defined', () => {
    expect(useMemoizedFn).toBeDefined();
  });

  it('useMemoizedFn should work', () => {
    act(() => {
      hook = renderHook(() => useCount());
    });
    const currentFn = hook.result.current.persistFn;
    expect(hook.result.current.persistFn()).toEqual(0);

    act(() => {
      hook.result.current.addCount();
    });

    expect(currentFn).toEqual(hook.result.current.persistFn);
    expect(hook.result.current.persistFn()).toEqual(1);
  });
});
