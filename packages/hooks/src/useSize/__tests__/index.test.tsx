import React, { useRef, act } from "react";
import { renderHook, render, screen } from "@testing-library/react";
import useSize from "../index";
import { sleep } from "../../utils/testingHelpers";

let callback;
jest.mock("resize-observer-polyfill", () => {
  return jest.fn().mockImplementation((cb) => {
    callback = cb;
    return {
      observe: () => {},
      disconnect: () => {},
    };
  });
});

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe("useSize", () => {
  it("should work when target is a mounted DOM", () => {
    const hook = renderHook(() => useSize(document.body));
    expect(hook.result.current).toEqual({ height: 0, width: 0 });
  });

  it("should work when target is a `MutableRefObject`", async () => {
    const mockRaf = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });

    function Setup() {
      const ref = useRef(null);
      const size = useSize(ref);

      return (
        <div ref={ref}>
          <div>width: {String(size?.width)}</div>
          <div>height: {String(size?.height)}</div>
        </div>
      );
    }

    render(<Setup />);
    expect(await screen.findByText(/^width/)).toHaveTextContent(
      "width: undefined"
    );
    expect(await screen.findByText(/^height/)).toHaveTextContent(
      "height: undefined"
    );

    act(() => callback([{ target: { clientWidth: 10, clientHeight: 10 } }]));
    expect(await screen.findByText(/^width/)).toHaveTextContent("width: 10");
    expect(await screen.findByText(/^height/)).toHaveTextContent("height: 10");
    mockRaf.mockRestore();
  });

  it("should not work when target is null", () => {
    expect(() => {
      renderHook(() => useSize(null));
    }).not.toThrowError();
  });

  it("should work", () => {
    const mockRaf = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
    const targetEl = document.createElement("div");
    const { result } = renderHook(() => useSize(targetEl));

    act(() => {
      callback([
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

  it("debounceOptions should work", async () => {
    let count = 0;

    function Setup() {
      const ref = useRef(null);
      const size = useSize(ref, { debounceOptions: { wait: 200 } });
      count += 1;

      return (
        <div ref={ref}>
          <div>width: {String(size?.width)}</div>
          <div>height: {String(size?.height)}</div>
        </div>
      );
    }

    render(<Setup />);

    act(() => callback([{ target: { clientWidth: 10, clientHeight: 10 } }]));
    act(() => callback([{ target: { clientWidth: 20, clientHeight: 20 } }]));
    act(() => callback([{ target: { clientWidth: 30, clientHeight: 30 } }]));

    expect(count).toBe(1);
    expect(await screen.findByText(/^width/)).toHaveTextContent(
      "width: undefined"
    );
    expect(await screen.findByText(/^height/)).toHaveTextContent(
      "height: undefined"
    );

    await sleep(300);

    expect(count).toBe(2);
    expect(await screen.findByText(/^width/)).toHaveTextContent("width: 30");
    expect(await screen.findByText(/^height/)).toHaveTextContent("height: 30");
  });

  it("throttleOptions should work", async () => {
    let count = 0;

    function Setup() {
      const ref = useRef(null);
      const size = useSize(ref, { throttleOptions: { wait: 500 } });
      count += 1;

      return (
        <div ref={ref}>
          <div>width: {String(size?.width)}</div>
          <div>height: {String(size?.height)}</div>
        </div>
      );
    }

    render(<Setup />);

    act(() => callback([{ target: { clientWidth: 10, clientHeight: 10 } }]));
    act(() => callback([{ target: { clientWidth: 20, clientHeight: 20 } }]));
    act(() => callback([{ target: { clientWidth: 30, clientHeight: 30 } }]));

    expect(count).toBe(1);
    expect(await screen.findByText(/^width/)).toHaveTextContent(
      "width: undefined"
    );
    expect(await screen.findByText(/^height/)).toHaveTextContent(
      "height: undefined"
    );

    await sleep(450);
    expect(count).toBe(2);
    expect(await screen.findByText(/^width/)).toHaveTextContent("width: 10");
    expect(await screen.findByText(/^height/)).toHaveTextContent("height: 10");

    await sleep(200);
    expect(count).toBe(3);
    expect(await screen.findByText(/^width/)).toHaveTextContent("width: 30");
    expect(await screen.findByText(/^height/)).toHaveTextContent("height: 30");
  });
});
