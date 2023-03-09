import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import useMemoizedFn from '../';

const useCount = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((c) => c + 1);
  };

  const memoizedFn = useMemoizedFn(() => count);

  return { addCount, memoizedFn };
};

let hook;

describe('useMemoizedFn', () => {
  it('useMemoizedFn should work', () => {
    act(() => {
      hook = renderHook(() => useCount());
    });
    const currentFn = hook.result.current.memoizedFn;
    expect(hook.result.current.memoizedFn()).toBe(0);

    act(() => {
      hook.result.current.addCount();
    });

    expect(currentFn).toEqual(hook.result.current.memoizedFn);
    expect(hook.result.current.memoizedFn()).toBe(1);
  });

  // it('should output error when fn is not a function', () => {
  //   const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   renderHook(() => useMemoizedFn(1 as any));
  //   expect(errSpy).toBeCalledWith('useMemoizedFn expected parameter is a function, got number');
  //   errSpy.mockRestore();
  // });
});
