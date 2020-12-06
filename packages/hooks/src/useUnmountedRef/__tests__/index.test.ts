import { renderHook } from '@testing-library/react-hooks';
import useUnmountedRef from '../index';

describe('useMountStatus', () => {
  it('should be defined', () => {
    expect(useUnmountedRef).toBeDefined();
  });
  it('test mount', async () => {
    const hook = renderHook(() => useUnmountedRef());
    expect(hook.result.current.current).toBe(false);
  });
  it('test unmounted', async () => {
    const hook = renderHook(() => useUnmountedRef());
    hook.unmount();
    expect(hook.result.current.current).toBe(true);
  });
});
