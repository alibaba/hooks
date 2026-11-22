import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useScrollLock from '../index';

afterEach(() => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  vi.restoreAllMocks();
});

describe('useScrollLock', () => {
  test('locks and restores the body', () => {
    const { result, unmount } = renderHook(() => useScrollLock());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].lock();
    });
    expect(result.current[0]).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      result.current[1].unlock();
    });
    expect(result.current[0]).toBe(false);
    expect(document.body.style.overflow).toBe('');
    unmount();
  });

  test('restores the inline styles that were there before the lock', () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '4px';
    const { result, unmount } = renderHook(() => useScrollLock({ compensateScrollbar: false }));

    act(() => {
      result.current[1].lock();
    });
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      result.current[1].unlock();
    });
    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.paddingRight).toBe('4px');
    unmount();
  });

  test('keeps the body locked until every caller releases', () => {
    const first = renderHook(() => useScrollLock());
    const second = renderHook(() => useScrollLock());

    act(() => {
      first.result.current[1].lock();
      second.result.current[1].lock();
    });
    act(() => {
      first.result.current[1].unlock();
    });
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      second.result.current[1].unlock();
    });
    expect(document.body.style.overflow).toBe('');
    first.unmount();
    second.unmount();
  });

  test('releases the lock when the component unmounts', () => {
    const { result, unmount } = renderHook(() => useScrollLock());
    act(() => {
      result.current[1].lock();
    });
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test('locks on mount with defaultLocked and releases on unmount', () => {
    const { result, unmount } = renderHook(() => useScrollLock({ defaultLocked: true }));

    expect(result.current[0]).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test('locks a custom target instead of the body', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const { result, unmount } = renderHook(() => useScrollLock({ target: element }));

    act(() => {
      result.current[1].lock();
    });
    expect(element.style.overflow).toBe('hidden');
    expect(document.body.style.overflow).toBe('');

    act(() => {
      result.current[1].toggle();
    });
    expect(element.style.overflow).toBe('');
    expect(result.current[0]).toBe(false);
    unmount();
    element.remove();
  });

  test('compensates the hidden scrollbar with padding on the body', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1015);
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000);
    const { result, unmount } = renderHook(() => useScrollLock());

    act(() => {
      result.current[1].lock();
    });
    expect(document.body.style.paddingRight).toBe('15px');

    act(() => {
      result.current[1].unlock();
    });
    expect(document.body.style.paddingRight).toBe('');
    unmount();
  });

  test('does not compensate when the option is off', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1015);
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000);
    const { result, unmount } = renderHook(() => useScrollLock({ compensateScrollbar: false }));

    act(() => {
      result.current[1].lock();
    });
    expect(document.body.style.paddingRight).toBe('');
    unmount();
  });

  test('reports transitions through onLock and onUnlock', () => {
    const onLock = vi.fn();
    const onUnlock = vi.fn();
    const { result, unmount } = renderHook(() => useScrollLock({ onLock, onUnlock }));

    act(() => {
      result.current[1].lock();
      // A second lock from the same hook is a no-op and must not report again.
      result.current[1].lock();
    });
    expect(onLock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current[1].toggle();
    });
    expect(onUnlock).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(false);
    unmount();
  });
});
