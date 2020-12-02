import { act, renderHook } from '@testing-library/react-hooks';
import useMountStatus from '../index';

describe('useMountStatus', () => {
  it('should be defined', () => {
    expect(useMountStatus).toBeDefined();
  });
  it('test mount', async () => {
    const hook = renderHook(() => useMountStatus());
    expect(hook.result.current()).toBe(true);
  });
  it('test unmounted', async () => {
    const hook = renderHook(() => useMountStatus());
    hook.unmount();
    expect(hook.result.current()).toBe(false);
  });
});
