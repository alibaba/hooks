import { renderHook } from '../../utils/tests';
import useUnmountedRef from '../index';

describe('useUnmountedRef', () => {
  it('should work', async () => {
    const hook = renderHook(() => useUnmountedRef());
    expect(hook.result.current.current).toBe(false);
    hook.rerender();
    expect(hook.result.current.current).toBe(false);
    hook.unmount();
    expect(hook.result.current.current).toBe(true);
  });
});
