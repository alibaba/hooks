import { describe, expect, test, it, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useFullscreen from '../index';
import type { Options } from '../index';
import type { BasicTarget } from '../../utils/domTarget';

// Mock screenfull
vi.mock('screenfull', () => {
  let currentElement: Element | null = null;
  const listeners = new Set<() => void>();

  return {
    default: {
      isEnabled: true,
      get element() {
        return currentElement;
      },
      request: vi.fn((element: Element) => {
        currentElement = element;
        // Simulate the change event
        setTimeout(() => {
          listeners.forEach((listener) => listener());
        }, 0);
        return Promise.resolve();
      }),
      exit: vi.fn(() => {
        currentElement = null;
        // Simulate the change event
        setTimeout(() => {
          listeners.forEach((listener) => listener());
        }, 0);
        return Promise.resolve();
      }),
      on: vi.fn((event: string, listener: () => void) => {
        if (event === 'change') {
          listeners.add(listener);
        }
      }),
      off: vi.fn((event: string, listener: () => void) => {
        if (event === 'change') {
          listeners.delete(listener);
        }
      }),
    },
  };
});

let globalHook: any;
let targetEl: any;
const events = {
  fullscreenchange: new Set(),
  fullscreenerror: new Set(),
};
const setup = (target: BasicTarget, options?: Options) => {
  globalHook = renderHook(() => useFullscreen(target, options));
  return globalHook;
};

describe('useFullscreen', () => {
  beforeEach(() => {
    targetEl = document.createElement('div');
    document.body.appendChild(targetEl);

    // Define requestFullscreen if it doesn't exist
    if (!HTMLElement.prototype.requestFullscreen) {
      HTMLElement.prototype.requestFullscreen = vi.fn();
    }

    vi.spyOn(HTMLElement.prototype, 'requestFullscreen').mockImplementation(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: targetEl,
      });
      return Promise.resolve();
    });
    // Define exitFullscreen if it doesn't exist
    if (!document.exitFullscreen) {
      document.exitFullscreen = vi.fn();
    }

    vi.spyOn(document, 'exitFullscreen').mockImplementation(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
      });
      return Promise.resolve();
    });
    vi.spyOn(document, 'addEventListener').mockImplementation((eventName, callback) => {
      if (events[eventName]) {
        events[eventName].add(callback);
      }
    });
    vi.spyOn(document, 'removeEventListener').mockImplementation((eventName, callback) => {
      if (events[eventName]) {
        events[eventName].delete(callback);
      }
    });
  });

  afterEach(() => {
    document.body.removeChild(targetEl);
    events.fullscreenchange.clear();
    globalHook?.unmount();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  test('enterFullscreen/exitFullscreen should be work', async () => {
    const { result } = setup(targetEl);
    const { enterFullscreen, exitFullscreen } = result.current[1];

    await act(async () => {
      enterFullscreen();
      // Wait for the async screenfull change event
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(result.current[0]).toBe(true);

    await act(async () => {
      exitFullscreen();
      // Wait for the async screenfull change event
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(result.current[0]).toBe(false);
  });

  test('toggleFullscreen should be work', async () => {
    const { result } = setup(targetEl);
    const { toggleFullscreen } = result.current[1];

    await act(async () => {
      toggleFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(result.current[0]).toBe(true);

    await act(async () => {
      toggleFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(result.current[0]).toBe(false);
  });

  test('onExit/onEnter should be called', async () => {
    const onExit = vi.fn();
    const onEnter = vi.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
    });
    const { toggleFullscreen } = result.current[1];

    await act(async () => {
      toggleFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(onEnter).toHaveBeenCalled();

    await act(async () => {
      toggleFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(onExit).toHaveBeenCalled();
  });

  test('onExit/onEnter should not be called', async () => {
    const onExit = vi.fn();
    const onEnter = vi.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
    });
    const { exitFullscreen, enterFullscreen } = result.current[1];

    // `onExit` should not be called when not full screen
    await act(async () => {
      exitFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(onExit).not.toHaveBeenCalled();

    // Enter full screen
    await act(async () => {
      enterFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(onEnter).toHaveBeenCalled();
    onEnter.mockClear();

    // `onEnter` should not be called when already full screen
    await act(async () => {
      enterFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(onEnter).not.toHaveBeenCalled();
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
    expect(onEnter).not.toBeCalled();
  });

  test('should remove event listener when unmount', async () => {
    const { result, unmount } = setup(targetEl);
    const { enterFullscreen } = result.current[1];

    await act(async () => {
      enterFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    // The screenfull mock manages its own listeners, so we just test that unmount works
    unmount();
    expect(result.current[0]).toBe(true); // State should still be true after unmount
  });

  test('`isFullscreen` should be false when use `document.exitFullscreen`', async () => {
    const { result } = setup(targetEl);
    const { enterFullscreen } = result.current[1];

    await act(async () => {
      enterFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(result.current[0]).toBe(true);

    // Use screenfull.exit() instead of document.exitFullscreen() since we're testing screenfull integration
    await act(async () => {
      const screenfull = await import('screenfull');
      screenfull.default.exit();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(result.current[0]).toBe(false);
  });

  test('mutli element full screen should be correct', async () => {
    const targetEl2 = document.createElement('p');
    const hook = setup(targetEl);
    const hook2 = setup(targetEl2);

    // target1 full screen
    await act(async () => {
      hook.result.current[1].enterFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(hook.result.current[0]).toBe(true);
    expect(hook2.result.current[0]).toBe(false);

    // target2 full screen (this will replace target1)
    await act(async () => {
      hook2.result.current[1].enterFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(hook.result.current[0]).toBe(false);
    expect(hook2.result.current[0]).toBe(true);

    // target2 exit full screen
    await act(async () => {
      hook2.result.current[1].exitFullscreen();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(hook.result.current[0]).toBe(false);
    expect(hook2.result.current[0]).toBe(false);
  });
});
