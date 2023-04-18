import { act, renderHook } from '@testing-library/react';
import useInViewport from '../index';

const targetEl = document.createElement('div');
document.body.appendChild(targetEl);

const observe = jest.fn();
const disconnect = jest.fn();

const mockIntersectionObserver = jest.fn().mockReturnValue({
  observe,
  disconnect,
});

window.IntersectionObserver = mockIntersectionObserver;

let isInter = null;
const callback = ({ isIntersecting }) => {
  isInter = isIntersecting;
};

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

  it('should work when target array is in viewport and has a callback', async () => {
    const targetEls: HTMLDivElement[] = [];
    const count = 5;
    for (let i = 0; i < count; i++) {
      const target = document.createElement('div');
      document.body.appendChild(target);
      targetEls.push(target);
    }

    renderHook(() => useInViewport(targetEls, { callback }));
    const calls = mockIntersectionObserver.mock.calls;
    const [onChange] = calls[calls.length - 1];

    act(() => {
      onChange([
        {
          isIntersecting: null,
        },
      ]);
    });
    expect(isInter).toBeNull();

    act(() => {
      onChange([
        {
          isIntersecting: true,
        },
      ]);
    });
    expect(isInter).toBeTruthy();

    act(() => {
      onChange([
        {
          isIntersecting: false,
        },
      ]);
    });
    expect(isInter).toBeFalsy();

    expect(observe).toHaveBeenCalledTimes(5);
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
