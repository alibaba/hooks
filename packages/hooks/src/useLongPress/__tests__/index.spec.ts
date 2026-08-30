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

class MockPointerEvent extends MouseEvent {
  isPrimary: boolean;
  pointerId: number;

  constructor(type: string, eventInitDict?: PointerEventInit) {
    super(type, eventInitDict);
    this.isPrimary = eventInitDict?.isPrimary ?? true;
    this.pointerId = eventInitDict?.pointerId ?? 0;
  }
}

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    vi.stubGlobal('PointerEvent', undefined);
  });

  afterEach(() => {
    events = {};
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  test('uses pointer events when available', () => {
    vi.stubGlobal('PointerEvent', MockPointerEvent);

    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(events.pointerdown).toBeDefined();
    expect(events.pointerup).toBeDefined();
    expect(events.mousedown).toBeUndefined();

    events.pointerdown(new PointerEvent('pointerdown'));
    vi.advanceTimersByTime(350);
    events.pointerup(new PointerEvent('pointerup'));

    events.pointerdown(new PointerEvent('pointerdown'));
    events.pointerup(new PointerEvent('pointerup'));

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockLongPressEndCallback).toHaveBeenCalledTimes(1);
    expect(mockClickCallback).toHaveBeenCalledTimes(1);
  });

  test('ignores events from a different pointer', () => {
    vi.stubGlobal('PointerEvent', MockPointerEvent);

    setup(mockCallback, mockTarget, {
      moveThreshold: { x: 30 },
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });

    events.pointerdown(new PointerEvent('pointerdown', { pointerId: 10 }));
    events.pointermove(new PointerEvent('pointermove', { clientX: 40, pointerId: 1 }));
    events.pointerup(new PointerEvent('pointerup', { pointerId: 1 }));
    vi.advanceTimersByTime(350);
    events.pointerup(new PointerEvent('pointerup', { pointerId: 10 }));

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockLongPressEndCallback).toHaveBeenCalledTimes(1);
    expect(mockClickCallback).not.toHaveBeenCalled();
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
    events['mousemove'](new MouseEvent('mousemove', { clientX: 40, clientY: 10 }));
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
