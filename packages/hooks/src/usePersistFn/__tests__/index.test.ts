import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useState } from 'react';
import usePersistFn from '../';

const useCount = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((c) => c + 1);
  };

  const persistFn = usePersistFn(() => count);

  return { addCount, persistFn };
};

let hook: RenderHookResult<[], ReturnType<typeof useCount>>;

describe('usePersistFn', () => {
  it('should be defined', () => {
    expect(usePersistFn).toBeDefined();
  });

  it('usePersistFn should work', () => {
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
