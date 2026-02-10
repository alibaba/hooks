import { act, renderHook } from '@testing-library/react';
import type { RenderHookResult } from '@testing-library/react';
import useBounding, { INIT_BOUNDING_RECT } from '../index';
import type { Target, UseBoundingOptions, UseBoundingRect } from '../index';

describe('useBounding', () => {
  const INIT_VALUE = {
    width: 200,
    height: 200,
    left: 100,
    right: 500,
    top: 100,
    bottom: 500,
    x: 100,
    y: 100,
  } as DOMRect;

  let windowAddEventListenerMock: any = {};
  let resizeObserverMock: jest.Mock<any, any, any>;
  let target: HTMLTextAreaElement;
  let targetRectMock: jest.SpyInstance<DOMRect, [], any>;
  let hook: RenderHookResult<UseBoundingRect, unknown>;

  beforeEach(() => {
    jest.spyOn(window, 'addEventListener').mockImplementation(
      jest.fn((event, callback) => {
        windowAddEventListenerMock[event] = callback;
      }),
    );

    window.ResizeObserver = resizeObserverMock = jest.fn().mockReturnValue({
      observe: () => null,
      disconnect: () => null,
    });

    target = document.createElement('textarea');
    targetRectMock = jest.spyOn(target, 'getBoundingClientRect').mockReturnValue(INIT_VALUE);
  });

  afterEach(() => {
    windowAddEventListenerMock = {};
    resizeObserverMock?.mockRestore();
    targetRectMock?.mockRestore();
    hook?.unmount();
  });

  function triggerResizeObserver() {
    const calls = resizeObserverMock.mock.calls;
    const [resizeObserverCallback] = calls[calls.length - 1];

    act(() => resizeObserverCallback());
  }

  function setup(el: Target, options?: UseBoundingOptions) {
    const res = renderHook(() => useBounding(el, options));

    // `ResizeObserver` API will call when component is mounted, so here simulate this behavior
    if (el) triggerResizeObserver();

    return res;
  }

  it('should work with target', async () => {
    hook = setup(target);
    expect(hook.result.current).toEqual(INIT_VALUE);
  });

  it('should return initial state when target is null', () => {
    hook = setup(null);
    expect(hook.result.current).toEqual(INIT_BOUNDING_RECT);
  });

  it('should work when the size of target changes', () => {
    hook = setup(target);
    // Simulate the size change of the target
    targetRectMock.mockReturnValue({ ...INIT_VALUE, width: 10, height: 10 });
    triggerResizeObserver();
    expect(hook.result.current).toEqual({ ...INIT_VALUE, width: 10, height: 10 });
  });

  function runWithResetParam(reset: boolean) {
    // `useBounding` will reset its internal state when component is unmounted, but it is difficult to simulate directly.
    // However, the `disconnect` fn of `ResizeObserver` will be called when component is unmounted,
    // so we can call `disconnect` fn to simulate "reset state"
    const disconnect = jest.fn().mockImplementation(() => {
      if (reset) {
        hook.result.current = INIT_BOUNDING_RECT;
      }
    });
    resizeObserverMock.mockReturnValue({
      observe: () => null,
      disconnect,
    });

    hook = setup(target, { reset });
    // Initial state
    expect(hook.result.current).toEqual(INIT_VALUE);

    hook.unmount();
    // It should be a new state when `reset: true`, otherwise old state
    expect(hook.result.current).toEqual(reset ? INIT_BOUNDING_RECT : INIT_VALUE);
  }

  it('should work with `reset: true`', async () => {
    runWithResetParam(true);
  });

  it('should work with `reset: false`', async () => {
    runWithResetParam(false);
  });

  function runWithWindowResizeParam(windowResize: boolean) {
    const newRect = { ...INIT_VALUE, width: 10, height: 10 };
    hook = setup(target, { windowResize });

    // Initial state
    expect(hook.result.current).toEqual(INIT_VALUE);

    // Mock "resize"
    targetRectMock.mockReturnValue(newRect);
    act(() => windowAddEventListenerMock?.resize?.());

    // It should be a new state when `windowResize: true`, otherwise old state
    expect(hook.result.current).toEqual(windowResize ? newRect : INIT_VALUE);
  }

  it('should work with `windowResize: true`', async () => {
    runWithWindowResizeParam(true);
  });

  it('should work with `windowResize: false`', async () => {
    runWithWindowResizeParam(false);
  });

  function runWithWindowScrollParam(windowScroll: boolean) {
    const newRect = { ...INIT_VALUE, width: 10, height: 10 };
    hook = setup(target, { windowScroll });

    // Initial state
    expect(hook.result.current).toEqual(INIT_VALUE);

    // Mock "scroll"
    targetRectMock.mockReturnValue(newRect);
    act(() => windowAddEventListenerMock?.scroll?.());

    // It should be a new state when `windowScroll: true`, otherwise old state
    expect(hook.result.current).toEqual(windowScroll ? newRect : INIT_VALUE);
  }

  it('should work when `windowScroll: true`', () => {
    runWithWindowScrollParam(true);
  });

  it('should work when `windowScroll: false`', () => {
    runWithWindowScrollParam(false);
  });

  it('should disconnect when unmount', async () => {
    const disconnect = jest.fn();

    resizeObserverMock.mockReturnValue({
      observe: () => null,
      disconnect,
    });
    hook = setup(target);
    hook.unmount();
    expect(disconnect).toBeCalled();
  });
});
