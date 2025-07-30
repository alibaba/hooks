import { describe, expect, test, it, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useLongPress from '../index';
import type { Options } from '../index';

const mockCallback = vi.fn();
const mockClickCallback = vi.fn();
const mockLongPressEndCallback = vi.fn();

let events = {};
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: vi.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
};

const setup = (onLongPress: any, target, options?: Options) =>
  renderHook(() => useLongPress(onLongPress, target, options));

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    events = {};
    vi.useRealTimers();
    // Clear all mocks
    mockCallback.mockClear();
    mockClickCallback.mockClear();
    mockLongPressEndCallback.mockClear();
  });

  test('longPress callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toHaveBeenCalled();
    events['mousedown']();
    vi.advanceTimersByTime(350);
    events['mouseleave']();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockLongPressEndCallback).toHaveBeenCalledTimes(1);
    expect(mockClickCallback).toHaveBeenCalledTimes(0);
  });

  test('click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toHaveBeenCalled();
    events['mousedown']();
    events['mouseup']();
    events['mousedown']();
    events['mouseup']();
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(mockLongPressEndCallback).toHaveBeenCalledTimes(0);
    expect(mockClickCallback).toHaveBeenCalledTimes(2);
  });

  test('longPress and click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toHaveBeenCalled();
    events['mousedown']();
    vi.advanceTimersByTime(350);
    events['mouseup']();
    events['mousedown']();
    events['mouseup']();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockLongPressEndCallback).toHaveBeenCalledTimes(1);
    expect(mockClickCallback).toHaveBeenCalledTimes(1);
  });

  test('onLongPress should not be called when over the threshold', () => {
    const { unmount } = setup(mockCallback, mockTarget, {
      moveThreshold: {
        x: 30,
        y: 20,
      },
    });
    expect(events['mousemove']).toBeDefined();
    events['mousedown'](new MouseEvent('mousedown'));
    events['mousemove'](
      new MouseEvent('mousemove', {
        clientX: 40,
        clientY: 10,
      }),
    );
    vi.advanceTimersByTime(320);
    expect(mockCallback).not.toHaveBeenCalled();

    unmount();
    expect(events['mousemove']).toBeUndefined();
  });

  test(`should not work when target don't support addEventListener method`, () => {
    Object.defineProperty(mockTarget, 'addEventListener', {
      get() {
        return false;
      },
    });

    setup(() => {}, mockTarget);
    expect(Object.keys(events)).toHaveLength(0);
  });
});
