import { renderHook, act } from '../../utils/tests';
import useMediaQuery from '..';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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
    expect(result.current[0]).toBe(false);
  });

  it('should return the correct value when the media query changes', () => {
    const { result } = renderHook(() => useMediaQuery(['(min-width: 1024px)'], [true], false));
    expect(result.current[0]).toBe(false);
    changeWidth(768);
    expect(result.current[0]).toBe(false);
  });
});
