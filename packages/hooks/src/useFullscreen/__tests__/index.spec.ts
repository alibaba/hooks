import { act, renderHook } from '@testing-library/react';
import screenfull from 'screenfull';
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { BasicTarget } from '../../utils/domTarget';
import useFullscreen, { type Options } from '../index';

// Mock screenfull
vi.mock('screenfull', () => ({
  default: {
    isEnabled: true,
    element: null,
    request: vi.fn(),
    exit: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}));

const mockScreenfull = screenfull as any;

let globalHook: any;
let targetEl: any;
let changeCallback: any;

const setup = (target: BasicTarget, options?: Options) => {
  globalHook = renderHook(() => useFullscreen(target, options));
  return globalHook;
};

describe('useFullscreen', () => {
  beforeEach(() => {
    targetEl = document.createElement('div');
    document.body.appendChild(targetEl);

    // Reset screenfull mocks
    mockScreenfull.element = null;
    mockScreenfull.on.mockImplementation((event: string, callback: any) => {
      if (event === 'change') {
        changeCallback = callback;
      }
    });
    mockScreenfull.off.mockImplementation(() => {});
    mockScreenfull.request.mockImplementation((el: any) => {
      mockScreenfull.element = el;
      return Promise.resolve();
    });
    mockScreenfull.exit.mockImplementation(() => {
      mockScreenfull.element = null;
      return Promise.resolve();
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(targetEl);
    globalHook?.unmount();
    changeCallback = null;
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  test('enterFullscreen/exitFullscreen should be work', () => {
    const { result } = setup(targetEl);
    const { enterFullscreen, exitFullscreen } = result.current[1];

    enterFullscreen();
    expect(mockScreenfull.request).toBeCalledWith(targetEl);

    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(result.current[0]).toBe(true);

    exitFullscreen();
    expect(mockScreenfull.exit).toBeCalled();

    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(result.current[0]).toBe(false);
  });

  test('toggleFullscreen should be work', () => {
    const { result } = setup(targetEl);
    const { toggleFullscreen } = result.current[1];

    toggleFullscreen();
    expect(mockScreenfull.request).toBeCalledWith(targetEl);

    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(result.current[0]).toBe(true);

    toggleFullscreen();
    expect(mockScreenfull.exit).toBeCalled();

    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(result.current[0]).toBe(false);
  });

  test('onExit/onEnter should be called', () => {
    const onExit = vi.fn();
    const onEnter = vi.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
    });
    const { toggleFullscreen } = result.current[1];

    toggleFullscreen();
    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(onEnter).toBeCalled();

    toggleFullscreen();
    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(onExit).toBeCalled();
  });

  test('onExit/onEnter should not be called', () => {
    const onExit = vi.fn();
    const onEnter = vi.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
    });
    const { exitFullscreen, enterFullscreen } = result.current[1];

    // `onExit` should not be called when not full screen
    exitFullscreen();
    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(onExit).not.toBeCalled();

    // Enter full screen
    enterFullscreen();
    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(onEnter).toBeCalled();
    onEnter.mockReset();

    // `onEnter` should not be called when full screen
    enterFullscreen();
    expect(onEnter).not.toBeCalled();
  });

  test('pageFullscreen should be work', () => {
    const PAGE_FULLSCREEN_CLASS_NAME = 'test-page-fullscreen';
    const PAGE_FULLSCREEN_Z_INDEX = 101;
    const onExit = vi.fn();
    const onEnter = vi.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
      pageFullscreen: {
        className: PAGE_FULLSCREEN_CLASS_NAME,
        zIndex: PAGE_FULLSCREEN_Z_INDEX,
      },
    });
    const { toggleFullscreen } = result.current[1];
    const getStyleEl = () => targetEl.querySelector('style');

    act(() => toggleFullscreen());
    expect(result.current[0]).toBe(true);
    expect(onEnter).toBeCalled();
    expect(targetEl.classList.contains(PAGE_FULLSCREEN_CLASS_NAME)).toBeTruthy();
    expect(getStyleEl()).not.toBeNull();
    expect(getStyleEl()?.textContent).toContain(`z-index: ${PAGE_FULLSCREEN_Z_INDEX}`);
    expect(getStyleEl()?.getAttribute('id')).toBe(PAGE_FULLSCREEN_CLASS_NAME);

    act(() => toggleFullscreen());
    expect(result.current[0]).toBe(false);
    expect(onExit).toBeCalled();
    expect(targetEl.classList.contains(PAGE_FULLSCREEN_CLASS_NAME)).toBeFalsy();
    expect(getStyleEl()).toBeNull();
    expect(getStyleEl()?.textContent).toBeUndefined();
    expect(getStyleEl()?.getAttribute('id')).toBeUndefined();
  });

  test('enterFullscreen should not work when target is not element', () => {
    const onEnter = vi.fn();
    const { result } = setup(null, { onEnter });
    const { enterFullscreen } = result.current[1];
    enterFullscreen();
    expect(mockScreenfull.request).not.toBeCalled();
    expect(onEnter).not.toBeCalled();
  });

  test('should remove event listener when unmount', () => {
    const { unmount } = setup(targetEl);
    expect(mockScreenfull.on).toBeCalledWith('change', expect.any(Function));

    unmount();
    expect(mockScreenfull.off).toBeCalledWith('change', expect.any(Function));
  });

  test('`isFullscreen` should be false when use `document.exitFullscreen`', () => {
    const { result } = setup(targetEl);
    const { enterFullscreen } = result.current[1];

    enterFullscreen();
    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(result.current[0]).toBe(true);

    // Simulate external exit fullscreen
    mockScreenfull.element = null;
    act(() => {
      if (changeCallback) changeCallback();
    });
    expect(result.current[0]).toBe(false);
  });

  test('mutli element full screen should be correct', () => {
    const targetEl2 = document.createElement('p');
    document.body.appendChild(targetEl2);

    // Store separate change callbacks for each hook
    let changeCallback1: any = null;
    let changeCallback2: any = null;

    // Override mock to track multiple callbacks
    mockScreenfull.on.mockImplementation((event: string, callback: any) => {
      if (event === 'change') {
        if (!changeCallback1) {
          changeCallback1 = callback;
        } else if (!changeCallback2) {
          changeCallback2 = callback;
        }
      }
    });

    const hook = setup(targetEl);
    const hook2 = setup(targetEl2);

    // target1 full screen
    hook.result.current[1].enterFullscreen();
    expect(mockScreenfull.element).toBe(targetEl);
    act(() => {
      if (changeCallback1) changeCallback1();
      if (changeCallback2) changeCallback2();
    });
    expect(hook.result.current[0]).toBe(true);

    // target2 full screen (this should make target1 not fullscreen)
    hook2.result.current[1].enterFullscreen();
    expect(mockScreenfull.element).toBe(targetEl2);
    act(() => {
      if (changeCallback1) changeCallback1();
      if (changeCallback2) changeCallback2();
    });
    expect(hook.result.current[0]).toBe(false);
    expect(hook2.result.current[0]).toBe(true);

    // target2 exit full screen (no element is fullscreen now)
    hook2.result.current[1].exitFullscreen();
    expect(mockScreenfull.element).toBe(null);
    act(() => {
      if (changeCallback1) changeCallback1();
      if (changeCallback2) changeCallback2();
    });
    expect(hook.result.current[0]).toBe(false);
    expect(hook2.result.current[0]).toBe(false);

    document.body.removeChild(targetEl2);
  });
});
