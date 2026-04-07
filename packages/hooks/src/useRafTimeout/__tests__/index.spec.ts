import { renderHook } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";

import useRafTimeout from "../index";

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number | undefined;
}

const setUp = ({ fn, delay }: ParamsObj) =>
  renderHook(() => useRafTimeout(fn, delay));

const FRAME_TIME = 16.7;
describe("useRafTimeout", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("timeout should work", () => {
    const callback = vi.fn();
    setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(FRAME_TIME * 2.5);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("timeout should stop when delay is undefined", () => {
    const delay: number | undefined = undefined;
    const callback = vi.fn();
    setUp({ fn: callback, delay });
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(FRAME_TIME * 1.5);
    expect(callback).not.toHaveBeenCalled();
  });

  test("timeout should be clear", () => {
    const callback = vi.fn();

    const hook = setUp({ fn: callback, delay: FRAME_TIME });
    expect(callback).not.toHaveBeenCalled();

    hook.result.current();
    vi.advanceTimersByTime(FRAME_TIME * 2.5);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
