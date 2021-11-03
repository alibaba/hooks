import { renderHook, act } from '@testing-library/react-hooks';
import useRafState from '../index';

describe('useRafState', () => {
  it('should be defined', () => {
    expect(useRafState).toBeDefined();
  });

  it('should work', () => {
    const { result } = renderHook(() => useRafState(0));
    const [rafState, setRafState] = result.current;
    expect(rafState).toBe(0);

    act(() => {
      setRafState(1);
      requestAnimationFrame(() => {
        expect(rafState).toBe(1);
      });
    });
  });
});
