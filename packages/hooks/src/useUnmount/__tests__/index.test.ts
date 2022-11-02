import { renderHook } from '@testing-library/react';
import useUnmount from '../index';
describe('useUnmount', () => {
  it('useUnmount should work', async () => {
    const fn = jest.fn();
    const hook = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0);
    hook.rerender();
    expect(fn).toBeCalledTimes(0);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);
  });

  // it('should output error when fn is not a function', () => {
  //   const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   renderHook(() => useUnmount(1 as any));
  //   expect(errSpy).toBeCalledWith('useUnmount expected parameter is a function, got number');
  //   errSpy.mockRestore();
  // });
});
