import { renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
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

describe.each([
  'pointer',
  'mouse',
  'touch',
  'pointer-strict',
  'mouse-strict',
  'touch-strict',
] as const)('updated options (%s)', (input) => {
  const renderUpdatedHook: typeof renderHook = (callback, options) =>
    renderHook(callback, {
      wrapper: input.endsWith('-strict') ? StrictMode : undefined,
      ...options,
    });
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('PointerEvent', input.startsWith('pointer') ? MockPointerEvent : undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  const send = (target: HTMLElement, phase: 'down' | 'move' | 'up', x = 0) => {
    if (input.startsWith('pointer')) {
      target.dispatchEvent(new PointerEvent(`pointer${phase}`, { pointerId: 1, clientX: x }));
    } else if (input.startsWith('mouse')) {
      target.dispatchEvent(new MouseEvent(`mouse${phase}`, { clientX: x }));
    } else {
      const type = phase === 'down' ? 'touchstart' : phase === 'up' ? 'touchend' : 'touchmove';
      target.dispatchEvent(
        new TouchEvent(type, { touches: [{ clientX: x, clientY: 0 } as Touch] }),
      );
    }
  };

  test.each([
    [100, 500],
    [500, 100],
  ])('uses delay updated from %i to %i for the next press', (initial, updated) => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const { rerender } = renderUpdatedHook(
      ({ delay }) => useLongPress(onLongPress, target, { delay }),
      {
        initialProps: { delay: initial },
      },
    );
    rerender({ delay: updated });
    send(target, 'down');
    vi.advanceTimersByTime(updated - 1);
    expect(onLongPress).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    send(target, 'up');
  });

  test.each([
    [undefined, { x: 10 }],
    [{ x: 100 }, { x: 10 }],
    [{ y: 100 }, { x: 10 }],
  ])('uses updated movement threshold %j -> %j', (initial, updated) => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const { rerender } = renderUpdatedHook(
      ({ moveThreshold }: { moveThreshold: Options['moveThreshold'] }) =>
        useLongPress(onLongPress, target, { moveThreshold }),
      { initialProps: { moveThreshold: initial } },
    );
    rerender({ moveThreshold: updated });
    send(target, 'down');
    send(target, 'move', 30);
    vi.advanceTimersByTime(350);
    expect(onLongPress).not.toHaveBeenCalled();
    send(target, 'up', 30);
  });

  test('removes the previous movement threshold', () => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const { rerender } = renderUpdatedHook(
      ({ moveThreshold }: { moveThreshold: Options['moveThreshold'] }) =>
        useLongPress(onLongPress, target, { moveThreshold }),
      { initialProps: { moveThreshold: { x: 10 } as Options['moveThreshold'] } },
    );
    rerender({ moveThreshold: undefined });
    send(target, 'down');
    send(target, 'move', 30);
    vi.advanceTimersByTime(350);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    send(target, 'up', 30);
  });

  test('keeps an active press for an equivalent inline configuration', () => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const { rerender } = renderUpdatedHook(() =>
      useLongPress(onLongPress, target, { delay: 300, moveThreshold: { x: 10 } }),
    );
    send(target, 'down');
    vi.advanceTimersByTime(150);
    rerender();
    vi.advanceTimersByTime(150);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    send(target, 'up');
  });

  test('cancels the old press and accepts a fresh press after options change', () => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const { rerender } = renderUpdatedHook(
      ({ delay }) => useLongPress(onLongPress, target, { delay }),
      {
        initialProps: { delay: 100 },
      },
    );
    send(target, 'down');
    vi.advanceTimersByTime(50);
    rerender({ delay: 200 });
    vi.advanceTimersByTime(300);
    expect(onLongPress).not.toHaveBeenCalled();
    send(target, 'down');
    vi.advanceTimersByTime(200);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    send(target, 'up');
  });
});

describe.each(['pointer', 'mouse', 'touch'] as const)('updated option cleanup (%s)', (input) => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('PointerEvent', input === 'pointer' ? MockPointerEvent : undefined);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
  const send = (target: HTMLElement, phase: 'down' | 'up') => {
    const type =
      input === 'pointer'
        ? `pointer${phase}`
        : input === 'mouse'
          ? `mouse${phase}`
          : phase === 'down'
            ? 'touchstart'
            : 'touchend';
    const event =
      input === 'pointer'
        ? new PointerEvent(type, { pointerId: 1 })
        : input === 'mouse'
          ? new MouseEvent(type)
          : new TouchEvent(type);
    target.dispatchEvent(event);
  };
  test('does not report a stale release as a click or long press end', () => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const onClick = vi.fn();
    const onLongPressEnd = vi.fn();
    const { rerender } = renderHook(
      ({ delay }) => useLongPress(onLongPress, target, { delay, onClick, onLongPressEnd }),
      { initialProps: { delay: 100 } },
    );
    send(target, 'down');
    vi.advanceTimersByTime(50);
    rerender({ delay: 200 });
    send(target, 'up');
    vi.advanceTimersByTime(300);
    expect(onLongPress).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
    expect(onLongPressEnd).not.toHaveBeenCalled();
    send(target, 'down');
    vi.advanceTimersByTime(200);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    rerender({ delay: 300 });
    send(target, 'up');
    expect(onClick).not.toHaveBeenCalled();
    expect(onLongPressEnd).not.toHaveBeenCalled();
    send(target, 'down');
    vi.advanceTimersByTime(300);
    send(target, 'up');
    expect(onLongPress).toHaveBeenCalledTimes(2);
    expect(onLongPressEnd).toHaveBeenCalledTimes(1);
  });
  test('cancels the replacement timer on unmount', () => {
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ delay }) => useLongPress(onLongPress, target, { delay }),
      { initialProps: { delay: 100 } },
    );
    rerender({ delay: 200 });
    send(target, 'down');
    vi.advanceTimersByTime(50);
    unmount();
    vi.advanceTimersByTime(300);
    expect(onLongPress).not.toHaveBeenCalled();
  });
});

describe('press cancellation and event guards', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
  test('ignores secondary and overlapping pointers and finishes cancellation once', () => {
    vi.stubGlobal('PointerEvent', MockPointerEvent);
    const target = document.createElement('button');
    const onLongPress = vi.fn(),
      onClick = vi.fn(),
      onLongPressEnd = vi.fn();
    renderHook(() => useLongPress(onLongPress, target, { onClick, onLongPressEnd }));
    const dispatch = (type: string, pointerId: number, isPrimary = true) =>
      target.dispatchEvent(new PointerEvent(type, { pointerId, isPrimary }));
    dispatch('pointerdown', 2, false);
    vi.advanceTimersByTime(350);
    expect(onLongPress).not.toHaveBeenCalled();
    dispatch('pointerdown', 1);
    dispatch('pointerdown', 2);
    dispatch('pointercancel', 2);
    vi.advanceTimersByTime(350);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    dispatch('pointercancel', 1);
    dispatch('pointercancel', 1);
    expect(onLongPressEnd).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
  test('ignores stale fallback releases, duplicate touches and touch-generated mouse events', () => {
    vi.stubGlobal('PointerEvent', undefined);
    const target = document.createElement('button');
    const onLongPress = vi.fn(),
      onClick = vi.fn(),
      onLongPressEnd = vi.fn();
    renderHook(() => useLongPress(onLongPress, target, { onClick, onLongPressEnd }));
    for (const type of ['mouseup', 'mouseleave', 'touchend', 'touchcancel']) {
      target.dispatchEvent(new Event(type));
    }
    for (const type of ['mousedown', 'mouseup']) {
      const event = new MouseEvent(type);
      Object.defineProperty(event, 'sourceCapabilities', { value: { firesTouchEvents: true } });
      target.dispatchEvent(event);
    }
    vi.advanceTimersByTime(350);
    expect(onLongPress).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
    target.dispatchEvent(new TouchEvent('touchstart'));
    target.dispatchEvent(new TouchEvent('touchstart'));
    vi.advanceTimersByTime(350);
    expect(onLongPress).toHaveBeenCalledTimes(1);
    target.dispatchEvent(new TouchEvent('touchcancel'));
    target.dispatchEvent(new TouchEvent('touchcancel'));
    expect(onLongPressEnd).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
  test('cancels when moving past the vertical threshold and tolerates non-mouse events', () => {
    vi.stubGlobal('PointerEvent', undefined);
    const target = document.createElement('button');
    const onLongPress = vi.fn();
    renderHook(() => useLongPress(onLongPress, target, { moveThreshold: { y: 10 } }));
    target.dispatchEvent(new MouseEvent('mousemove', { clientY: 30 }));
    target.dispatchEvent(new MouseEvent('mousedown'));
    target.dispatchEvent(new Event('mousemove'));
    target.dispatchEvent(new MouseEvent('mousemove', { clientY: 30 }));
    vi.advanceTimersByTime(350);
    expect(onLongPress).not.toHaveBeenCalled();
    target.dispatchEvent(new MouseEvent('mouseup'));
  });
});
