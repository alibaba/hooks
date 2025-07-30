import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import useInViewport from '../index';

const targetEl = document.createElement('div');
document.body.appendChild(targetEl);

const observe = vi.fn();
const disconnect = vi.fn();

const mockIntersectionObserver = vi.fn().mockReturnValue({
  observe,
  disconnect,
});

window.IntersectionObserver = mockIntersectionObserver;

describe('useInViewport', () => {
  test('should work when target is in viewport', async () => {
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

  test('should work when target array is in viewport and has a callback', async () => {
    const targetEls: HTMLDivElement[] = [];
    const callback = vi.fn();
    for (let i = 0; i < 2; i++) {
      const target = document.createElement('div');
      document.body.appendChild(target);
      targetEls.push(target);
    }

    const getValue = (isIntersecting, intersectionRatio) => ({ isIntersecting, intersectionRatio });

    const { result } = renderHook(() => useInViewport(targetEls, { callback }));
    const calls = mockIntersectionObserver.mock.calls;
    const [observerCallback] = calls[calls.length - 1];

    const target = getValue(false, 0);
    act(() => observerCallback([target]));
    expect(callback).toHaveBeenCalledWith(target);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBe(0);

    const target1 = getValue(true, 0.5);
    act(() => observerCallback([target1]));
    expect(callback).toHaveBeenCalledWith(target1);
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(0.5);
  });

  test('should not work when target is null', async () => {
    const previousCallsLength = mockIntersectionObserver.mock.calls.length;
    renderHook(() => useInViewport(null));
    const currentCallsLength = mockIntersectionObserver.mock.calls.length;
    expect(currentCallsLength).toBe(previousCallsLength);
  });

  test('should disconnect when unmount', async () => {
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect,
    });
    const { unmount } = renderHook(() => useInViewport(targetEl));
    unmount();
    expect(disconnect).toBeCalled();
  });
});
