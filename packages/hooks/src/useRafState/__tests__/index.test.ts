import { renderHook, act } from '@testing-library/react';
import useRafState from '../index';

describe('useRafState', () => {
  it('should work', () => {
    const mockRaf = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
    const { result } = renderHook(() => useRafState(0));
    const setRafState = result.current[1];
    expect(result.current[0]).toBe(0);

    act(() => {
      setRafState(1);
    });
    expect(result.current[0]).toBe(1);
    mockRaf.mockRestore();
  });
});
