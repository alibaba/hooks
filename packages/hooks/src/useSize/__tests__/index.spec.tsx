import { act, render, renderHook, screen } from "@testing-library/react";
import React, { useRef } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useSize from "../index";

interface MockResizeObserverEntry {
  target: Pick<HTMLElement, "clientHeight" | "clientWidth">;
}

type ResizeObserverTestCallback = (entries: MockResizeObserverEntry[]) => void;

let callback: ResizeObserverTestCallback | undefined;

vi.mock("resize-observer-polyfill", () => {
  return {
    default: class MockResizeObserver {
      observe() {}
      disconnect() {}
      constructor(cb: ResizeObserverTestCallback) {
        callback = cb;
      }
    },
  };
});

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe("useSize", () => {
  beforeEach(() => {
    callback = undefined;
  });

  test("should work when target is a mounted DOM", () => {
    const hook = renderHook(() => useSize(document.body));
    expect(hook.result.current).toEqual({ height: 0, width: 0 });
  });

  test("should work when target is a `MutableRefObject`", async () => {
    const mockRaf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });

    const Setup: React.FC = () => {
      const ref = useRef<HTMLDivElement>(null);
      const size = useSize(ref);
      return (
        <div ref={ref}>
          <div>width: {String(size?.width)}</div>
          <div>height: {String(size?.height)}</div>
        </div>
      );
    };

    render(<Setup />);
    expect((await screen.findByText(/^width/)).textContent).toBe(
      "width: undefined"
    );
    expect((await screen.findByText(/^height/)).textContent).toBe(
      "height: undefined"
    );

    act(() => callback?.([{ target: { clientWidth: 10, clientHeight: 10 } }]));
    expect((await screen.findByText(/^width/)).textContent).toBe("width: 10");
    expect((await screen.findByText(/^height/)).textContent).toBe("height: 10");
    mockRaf.mockRestore();
  });

  test("should not work when target is null", () => {
    expect(() => {
      renderHook(() => useSize(null));
    }).not.toThrow();
  });

  test("should work", () => {
    const mockRaf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
    const targetEl = document.createElement("div");
    const { result } = renderHook(() => useSize(targetEl));

    act(() => {
      callback?.([
        {
          target: {
            clientWidth: 100,
            clientHeight: 50,
          },
        },
      ]);
    });

    expect(result.current).toMatchObject({
      width: 100,
      height: 50,
    });

    mockRaf.mockRestore();
  });
});
