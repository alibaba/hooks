import { renderHook, act } from '@testing-library/react';
import useFullscreen from '../index';
import type { Options } from '../index';
import type { BasicTarget } from '../../utils/domTarget';

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
    jest.spyOn(HTMLElement.prototype, 'requestFullscreen').mockImplementation(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: targetEl,
      });
      return Promise.resolve();
    });
    jest.spyOn(document, 'exitFullscreen').mockImplementation(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
      });
      return Promise.resolve();
    });
    jest.spyOn(document, 'addEventListener').mockImplementation((eventName, callback) => {
      if (events[eventName]) {
        events[eventName].add(callback);
      }
    });
    jest.spyOn(document, 'removeEventListener').mockImplementation((eventName, callback) => {
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
    jest.resetAllMocks();
  });

  it('enterFullscreen/exitFullscreen should be work', () => {
    const { result } = setup(targetEl);
    const { enterFullscreen, exitFullscreen } = result.current[1];
    enterFullscreen();
    act(() => {
      events.fullscreenchange.forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBe(true);

    exitFullscreen();
    act(() => {
      events.fullscreenchange.forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBe(false);
  });

  it('toggleFullscreen should be work', () => {
    const { result } = setup(targetEl);
    const { toggleFullscreen } = result.current[1];
    toggleFullscreen();
    act(() => {
      events.fullscreenchange.forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBe(true);

    toggleFullscreen();
    act(() => {
      events.fullscreenchange.forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBe(false);
  });

  it('onExit/onEnter should be called', () => {
    const onExit = jest.fn();
    const onEnter = jest.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
    });
    const { toggleFullscreen } = result.current[1];
    toggleFullscreen();
    act(() => {
      events.fullscreenchange.forEach((fn: any) => fn());
    });
    expect(onEnter).toBeCalled();

    toggleFullscreen();
    act(() => {
      events.fullscreenchange.forEach((fn: any) => fn());
    });
    expect(onExit).toBeCalled();
  });

  it('onExit/onEnter should not be called', () => {
    const onExit = jest.fn();
    const onEnter = jest.fn();
    const { result } = setup(targetEl, {
      onExit,
      onEnter,
    });
    const { exitFullscreen, enterFullscreen } = result.current[1];

    // `onExit` should not be called when not full screen
    exitFullscreen();
    act(() => events.fullscreenchange.forEach((fn: any) => fn()));
    expect(onExit).not.toBeCalled();

    // Enter full screen
    enterFullscreen();
    act(() => events.fullscreenchange.forEach((fn: any) => fn()));
    expect(onEnter).toBeCalled();
    onEnter.mockReset();

    // `onEnter` should not be called when full screen
    enterFullscreen();
    // There is no need to write: `act(() => events.fullscreenchange.forEach((fn: any) => fn()));`,
    // because in a real browser, if it is already in full screen, calling `enterFullscreen` again
    // will not trigger the `change` event.
    expect(onEnter).not.toBeCalled();
  });

  it('pageFullscreen should be work', () => {
    const PAGE_FULLSCREEN_CLASS_NAME = 'test-page-fullscreen';
    const PAGE_FULLSCREEN_Z_INDEX = 101;
    const onExit = jest.fn();
    const onEnter = jest.fn();
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

  it('enterFullscreen should not work when target is not element', () => {
    const onEnter = jest.fn();
    const { result } = setup(null, { onEnter });
    const { enterFullscreen } = result.current[1];
    enterFullscreen();
    expect(onEnter).not.toBeCalled();
  });

  it('should remove event listener when unmount', () => {
    const { result, unmount } = setup(targetEl);
    const { enterFullscreen } = result.current[1];
    enterFullscreen();
    const size = events.fullscreenchange.size;
    unmount();
    expect(events.fullscreenchange.size).toBe(size - 1);
  });

  it('`isFullscreen` should be false when use `document.exitFullscreen`', () => {
    const { result } = setup(targetEl);
    const { enterFullscreen } = result.current[1];
    enterFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBe(true);

    document.exitFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBe(false);
  });

  it('mutli element full screen should be correct', () => {
    const targetEl2 = document.createElement('p');
    const hook = setup(targetEl);
    const hook2 = setup(targetEl2);

    // target1 full screen
    hook.result.current[1].enterFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(hook.result.current[0]).toBe(true);

    // target2 full screen
    hook2.result.current[1].enterFullscreen();
    Object.defineProperty(document, 'fullscreenElement', {
      value: targetEl2,
    });
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(hook.result.current[0]).toBe(false);
    expect(hook2.result.current[0]).toBe(true);

    // target2 exit full screen
    hook2.result.current[1].exitFullscreen();
    Object.defineProperty(document, 'fullscreenElement', {
      value: targetEl,
    });
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(hook.result.current[0]).toBe(true);
    expect(hook2.result.current[0]).toBe(false);
  });
});
