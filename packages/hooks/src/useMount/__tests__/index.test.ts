import { renderHook } from '@testing-library/react';
import useMount from '../index';

describe('useMount', () => {
  it('test mount', async () => {
    const fn = jest.fn();
    const hook = renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
    hook.rerender();
    expect(fn).toBeCalledTimes(1);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);

    renderHook(() => useMount(fn)).unmount();
    expect(fn).toBeCalledTimes(2);
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
