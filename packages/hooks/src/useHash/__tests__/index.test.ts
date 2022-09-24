import { renderHook, act } from '@testing-library/react-hooks';
import useHash from '../useHash';

describe('useDefault', () => {
  it('should use the default state', () => {
    const { result } = renderHook(() => useHash());
    expect(result.current[0]).toBe(window.location.hash);
    expect(typeof result.current[1]).toBe('function');
    act(() => {
      result.current[1]('#list');
    });
    expect(window.location.hash).toBe('#list');
  });
});
