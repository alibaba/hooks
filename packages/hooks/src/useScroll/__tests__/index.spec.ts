import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useScroll from '../index';

describe('useScroll', () => {
  afterEach(() => vi.useRealTimers());

  test('reads the scrolling element and fallback offsets from an iframe document', () => {
    vi.useFakeTimers();
    const frame = document.body.appendChild(document.createElement('iframe'));
    try {
      const doc = frame.contentDocument!;
      const scroller = doc.documentElement;
      Object.defineProperty(doc, 'scrollingElement', { configurable: true, value: scroller });
      scroller.scrollLeft = 12;
      scroller.scrollTop = 34;
      const { result, unmount } = renderHook(() => useScroll(doc));
      act(() => vi.advanceTimersToNextFrame());
      expect(result.current).toEqual({ left: 12, top: 34 });

      Object.defineProperty(doc, 'scrollingElement', { value: null });
      Object.defineProperty(frame.contentWindow!, 'pageXOffset', { value: 56 });
      doc.body.scrollTop = 78;
      doc.dispatchEvent(new Event('scroll'));
      act(() => vi.advanceTimersToNextFrame());
      expect(result.current).toEqual({ left: 56, top: 78 });
      unmount();
    } finally {
      frame.remove();
    }
  });

  test('handles a document without a browsing context or scrolling element', () => {
    vi.useFakeTimers();
    const doc = new Document();
    const { result } = renderHook(() => useScroll(doc));
    act(() => vi.advanceTimersToNextFrame());
    expect(result.current).toEqual({ left: 0, top: 0 });
  });

  test('reads element offsets when the target ref is attached', () => {
    vi.useFakeTimers();
    const target: { current: HTMLElement | null } = { current: null };
    const { result, rerender } = renderHook(() => useScroll(target, (pos) => pos.top > 0));
    act(() => vi.advanceTimersToNextFrame());
    expect(result.current).toBeUndefined();

    target.current = document.createElement('div');
    rerender();
    act(() => vi.advanceTimersToNextFrame());
    expect(result.current).toBeUndefined();

    target.current.scrollTop = 50;
    target.current.dispatchEvent(new Event('scroll'));
    act(() => vi.advanceTimersToNextFrame());
    expect(result.current).toEqual({ left: 0, top: 50 });
  });

  test('document body', () => {
    const hook = renderHook(() => useScroll(document));
    expect(hook.result.current).toBeUndefined();
  });
});
