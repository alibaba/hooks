import { renderHook, act } from '@testing-library/react-hooks';
import useDefault from '../useDefault';

describe('useDefault', () => {
  it('should use the default state', () => {
    const { result } = renderHook(() => useDefault({ name: 'hookA' }, { name: 'hookB' }));
    expect(result.current[0].name).toBe('hookB');
    expect(typeof result.current[1]).toBe('function');
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0].name).toBe('hookA');
  });
});
