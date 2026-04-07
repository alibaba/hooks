import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useInViewport from "../index";

const targetEl = document.createElement("div");
document.body.appendChild(targetEl);

interface MockIntersectionObserverEntry {
  intersectionRatio: number;
  isIntersecting: boolean;
}

type IntersectionObserverTestCallback = (
  entries: MockIntersectionObserverEntry[]
) => void;

let observeMock = vi.fn();
let disconnectMock = vi.fn();
let intersectionObserverCallCount = 0;
let intersectionObserverCallback: IntersectionObserverTestCallback | undefined;

class MockIntersectionObserver {
  observe = observeMock;
  disconnect = disconnectMock;
  constructor(callback: IntersectionObserverTestCallback) {
    intersectionObserverCallCount += 1;
    intersectionObserverCallback = callback;
  }
}

window.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("useInViewport", () => {
  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    intersectionObserverCallCount = 0;
    intersectionObserverCallback = undefined;
  });

  test("should work when target is in viewport", async () => {
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

  test("should work when target array is in viewport and has a callback", async () => {
    const targetEls: HTMLDivElement[] = [];
    const callback = vi.fn();
    for (let i = 0; i < 2; i++) {
      const target = document.createElement("div");
      document.body.appendChild(target);
      targetEls.push(target);
    }

    const getValue = (
      isIntersecting: MockIntersectionObserverEntry["isIntersecting"],
      intersectionRatio: MockIntersectionObserverEntry["intersectionRatio"]
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

  test("should not work when target is null", async () => {
    renderHook(() => useInViewport(null));
    expect(intersectionObserverCallCount).toBe(0);
  });

  test("should disconnect when unmount", async () => {
    const { unmount } = renderHook(() => useInViewport(targetEl));
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
