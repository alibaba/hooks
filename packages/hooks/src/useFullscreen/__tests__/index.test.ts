import { renderHook, act } from '@testing-library/react';
import useFullscreen, { Options } from '../index';
import type { BasicTarget } from '../../utils/domTarget';

const targetEl = document.createElement('div');
const events = {
  fullscreenchange: new Set(),
  fullscreenerror: new Set(),
};

const setup = (target: BasicTarget, options?: Options) =>
  renderHook(() => useFullscreen(target, options));

describe('useFullscreen', () => {
  beforeAll(() => {
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
    events.fullscreenchange.clear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('enterFullscreen/exitFullscreen should be work', () => {
    const { result } = setup(targetEl);
    const { enterFullscreen, exitFullscreen } = result.current[1];
    enterFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBeTruthy();

    exitFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBeFalsy();
  });

  it('toggleFullscreen should be work', () => {
    const { result } = setup(targetEl);
    const { toggleFullscreen } = result.current[1];
    toggleFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBeTruthy();

    toggleFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBeFalsy();
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
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(onEnter).toBeCalled();

    toggleFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(onExit).toBeCalled();
  });

  it('enterFullscreen should not work when target is not element', () => {
    const { result } = setup(null);
    const { enterFullscreen } = result.current[1];
    enterFullscreen();
    expect(events.fullscreenchange.size).toBe(0);
  });

  it('exitFullscreen should not work when not in full screen', () => {
    const onExit = jest.fn();
    const { result } = setup(targetEl, { onExit });
    const { exitFullscreen } = result.current[1];
    exitFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(onExit).not.toBeCalled();
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
    expect(result.current[0]).toBeTruthy();

    document.exitFullscreen();
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(result.current[0]).toBeFalsy();
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
    expect(hook.result.current[0]).toBeTruthy();

    // target2 full screen
    hook2.result.current[1].enterFullscreen();
    Object.defineProperty(document, 'fullscreenElement', {
      value: targetEl2,
    });
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(hook.result.current[0]).toBeFalsy();
    expect(hook2.result.current[0]).toBeTruthy();

    // target2 exit full screen
    hook2.result.current[1].exitFullscreen();
    Object.defineProperty(document, 'fullscreenElement', {
      value: targetEl,
    });
    act(() => {
      events['fullscreenchange'].forEach((fn: any) => fn());
    });
    expect(hook.result.current[0]).toBeTruthy();
    expect(hook2.result.current[0]).toBeFalsy();
  });
});
