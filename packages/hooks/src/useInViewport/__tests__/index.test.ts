import useInViewport from '../index';
import { renderHook, act } from '@testing-library/react';

const targetEl = document.createElement('div');
document.body.appendChild(targetEl);

const mockIntersectionObserver = jest.fn().mockReturnValue({
  observe: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

describe('useInViewport', () => {
  it('should work when target is in viewport', async () => {
    const { result } = renderHook(() => useInViewport(targetEl));
    const calls = mockIntersectionObserver.mock.calls;
    const [onChange] = calls[calls.length - 1];

    act(() => {
      onChange([
        {
          targetEl,
          isIntersecting: true,
          intersectionRatio: 0.5,
        },
      ]);
    });

    const [inViewport, ratio] = result.current;
    expect(inViewport).toBeTruthy();
    expect(ratio).toBe(0.5);
  });

  it('should not work when target is null', async () => {
    renderHook(() => useInViewport(null));
    const calls = mockIntersectionObserver.mock.calls;
    expect(calls[calls.length - 1]).toBeUndefined();
  });

  it('should disconnect when unmount', async () => {
    const disconnect = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect,
    });
    const { unmount } = renderHook(() => useInViewport(targetEl));
    unmount();
    expect(disconnect).toBeCalled();
  });
});
