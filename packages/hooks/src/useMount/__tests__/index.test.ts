import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useMount from '../index';

describe('useMount', () => {
  test('test mount', async () => {
    const destructor = vi.fn();
    const fn = vi.fn();
    fn.mockReturnValue(destructor);
    const hook = renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(destructor).toHaveBeenCalledTimes(0);
    hook.rerender();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(destructor).toHaveBeenCalledTimes(0);
    hook.unmount();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(destructor).toHaveBeenCalledTimes(1);

    renderHook(() => useMount(fn)).unmount();
    expect(fn).toHaveBeenCalledTimes(2);
    expect(destructor).toHaveBeenCalledTimes(2);
  });

  // test('should output error when fn is not a function', () => {
  //   const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  //   renderHook(() => useMount(1 as any));
  //   expect(errSpy).toBeCalledWith(
  //     'useMount: parameter `fn` expected to be a function, but got "number".',
  //   );
  //   errSpy.mockRestore();
  // });
});
