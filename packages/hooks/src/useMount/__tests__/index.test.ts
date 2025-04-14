import { renderHook } from '@testing-library/react';
import useMount from '../index';

describe('useMount', () => {
  it('test mount', async () => {
    const destructor = jest.fn();
    const fn = jest.fn();
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

  // it('should output error when fn is not a function', () => {
  //   const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   renderHook(() => useMount(1 as any));
  //   expect(errSpy).toBeCalledWith(
  //     'useMount: parameter `fn` expected to be a function, but got "number".',
  //   );
  //   errSpy.mockRestore();
  // });
});
