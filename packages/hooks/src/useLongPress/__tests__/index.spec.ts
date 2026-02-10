import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { Options } from '../index';
import useLongPress from '../index';

const mockCallback = vi.fn();
const mockClickCallback = vi.fn();
const mockLongPressEndCallback = vi.fn();

let events: Record<string, any> = {};
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: vi.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
};

const setup = (onLongPress: any, target: any, options?: Options) =>
  renderHook(() => useLongPress(onLongPress, target, options));

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    events = {};
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test('longPress callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();
    events['mousedown']();
    vi.advanceTimersByTime(350);
    events['mouseleave']();
    expect(mockCallback).toBeCalledTimes(1);
    expect(mockLongPressEndCallback).toBeCalledTimes(1);
    expect(mockClickCallback).toBeCalledTimes(0);
  });

  test('click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();
    events['mousedown']();
    events['mouseup']();
    events['mousedown']();
    events['mouseup']();
    expect(mockCallback).toBeCalledTimes(0);
    expect(mockLongPressEndCallback).toBeCalledTimes(0);
    expect(mockClickCallback).toBeCalledTimes(2);
  });

  test('longPress and click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();
    events['mousedown']();
    vi.advanceTimersByTime(350);
    events['mouseup']();
    events['mousedown']();
    events['mouseup']();
    expect(mockCallback).toBeCalledTimes(1);
    expect(mockLongPressEndCallback).toBeCalledTimes(1);
    expect(mockClickCallback).toBeCalledTimes(1);
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
    expect(mockCallback).not.toBeCalled();

    unmount();
    expect(events['mousemove']).toBeUndefined();
  });

  test(`should not work when target don't support addEventListener method`, () => {
    const customTarget = {
      addEventListener: false,
      removeEventListener: vi.fn(),
    };

    setup(() => {}, customTarget as any);
    expect(Object.keys(events)).toHaveLength(0);
  });

  test('should ignore right-click (button 2)', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();
    // Simulate right-click
    events['mousedown'](new MouseEvent('mousedown', { button: 2 }));
    vi.advanceTimersByTime(350);
    events['mouseup'](new MouseEvent('mouseup', { button: 2 }));
    expect(mockCallback).toBeCalledTimes(0);
    expect(mockLongPressEndCallback).toBeCalledTimes(0);
    expect(mockClickCallback).toBeCalledTimes(0);
  });

  test('should ignore middle-click (button 1)', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();
    // Simulate middle-click
    events['mousedown'](new MouseEvent('mousedown', { button: 1 }));
    vi.advanceTimersByTime(350);
    events['mouseup'](new MouseEvent('mouseup', { button: 1 }));
    expect(mockCallback).toBeCalledTimes(0);
    expect(mockLongPressEndCallback).toBeCalledTimes(0);
    expect(mockClickCallback).toBeCalledTimes(0);
  });

  test('should prevent context menu when long press is triggered', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();
    expect(events['contextmenu']).toBeDefined();

    // Trigger long press
    events['mousedown'](new MouseEvent('mousedown', { button: 0 }));
    vi.advanceTimersByTime(350);

    // Now context menu event should be prevented
    const mockEvent = { preventDefault: vi.fn() };
    events['contextmenu'](mockEvent);
    expect(mockEvent.preventDefault).toBeCalledTimes(1);

    events['mouseup'](new MouseEvent('mouseup', { button: 0 }));
  });

  test('should not prevent context menu when long press is not triggered', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();

    // Don't trigger long press - just a quick click
    events['mousedown'](new MouseEvent('mousedown', { button: 0 }));
    events['mouseup'](new MouseEvent('mouseup', { button: 0 }));

    // Context menu event should not be prevented
    const mockEvent = { preventDefault: vi.fn() };
    events['contextmenu'](mockEvent);
    expect(mockEvent.preventDefault).toBeCalledTimes(0);
  });
});
