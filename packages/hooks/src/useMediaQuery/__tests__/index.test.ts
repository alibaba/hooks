import { renderHook, act } from '../../utils/tests';
import useMediaQuery from '..';

describe('useMediaQuery', () => {
  function changeWidth(width: number) {
    act(() => {
      (global as any).innerWidth = width;
      (global as any).dispatchEvent(new Event('resize'));
    });
  }
  changeWidth(1024);

  it('should be defined', () => {
    expect(useMediaQuery).toBeDefined();
  });

  it('should return the correct value', () => {
    const { result } = renderHook(() => useMediaQuery(['(min-width: 1024px)'], [true], false));
    expect(result.current[0]).toBe(true);
  });

  it('should return the correct value when the media query changes', () => {
    const { result } = renderHook(() => useMediaQuery(['(min-width: 1024px)'], [true], false));
    expect(result.current[0]).toBe(true);
    changeWidth(768);
    expect(result.current[0]).toBe(false);
  });
});
