import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import useInViewport from '../index';

const targetEl = document.createElement('div');
document.body.appendChild(targetEl);

interface MockIntersectionObserverEntry {
  intersectionRatio: number;
  isIntersecting: boolean;
}

type IntersectionObserverTestCallback = (entries: MockIntersectionObserverEntry[]) => void;

let observeMock = vi.fn();
let disconnectMock = vi.fn();
const observerOptions = vi.fn<(options: IntersectionObserverInit) => void>();
let intersectionObserverCallback: IntersectionObserverTestCallback | undefined;

class MockIntersectionObserver {
  observe = observeMock;
  disconnect = disconnectMock;
  constructor(callback: IntersectionObserverTestCallback, options: IntersectionObserverInit) {
    observerOptions(options);
    intersectionObserverCallback = callback;
  }
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe('useInViewport', () => {
  beforeEach(() => {
    observerOptions.mockClear();
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    intersectionObserverCallback = undefined;
  });

  test('should work when target is in viewport', async () => {
    const { result } = renderHook(() => useInViewport(targetEl));

    act(() => {
      intersectionObserverCallback?.([
        {
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

    const getValue = (
      isIntersecting: MockIntersectionObserverEntry['isIntersecting'],
      intersectionRatio: MockIntersectionObserverEntry['intersectionRatio'],
    ): MockIntersectionObserverEntry => ({
      isIntersecting,
      intersectionRatio,
    });

    const { result } = renderHook(() => useInViewport(targetEls, { callback }));

    const target = getValue(false, 0);
    act(() => intersectionObserverCallback?.([target]));
    expect(callback).toHaveBeenCalledWith(target);
    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBe(0);

    const target1 = getValue(true, 0.5);
    act(() => intersectionObserverCallback?.([target1]));
    expect(callback).toHaveBeenCalledWith(target1);
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(0.5);
  });

  test('reconnects when the root ref points to a different scroll container', () => {
    const initialRoot = document.createElement('section');
    const root: { current: HTMLElement | null } = { current: initialRoot };
    const first = document.createElement('div');
    const second = document.createElement('div');
    const targets = [first, second];
    initialRoot.append(first, second);
    const { rerender, unmount } = renderHook(() => useInViewport(targets, { root }));
    expect(observerOptions).toHaveBeenLastCalledWith({ root: root.current });

    root.current = document.createElement('section');
    root.current.append(first, second);
    rerender();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(observerOptions).toHaveBeenLastCalledWith({ root: root.current });
    expect(observeMock.mock.calls).toEqual([[first], [second], [first], [second]]);

    rerender();
    expect(observerOptions).toHaveBeenCalledTimes(2);
    root.current = null;
    rerender();
    expect(observerOptions).toHaveBeenLastCalledWith({ root: null });
    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(3);
  });

  test('should not work when target is null', async () => {
    renderHook(() => useInViewport(null));
    expect(observerOptions).not.toHaveBeenCalled();
  });

  test('should disconnect when unmount', async () => {
    const { unmount } = renderHook(() => useInViewport(targetEl));
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
