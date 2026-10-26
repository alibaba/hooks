import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useTheme from '../index';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // Default value, can be overridden for specific tests
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated but often still present
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  test('themeMode init', () => {
    const { result } = renderHook(useTheme);
    expect(result.current.themeMode).toBe('system');
  });

  test.each(['light', 'dark', 'system'] as const)('reads the stored %s mode', (mode) => {
    localStorage.setItem('theme', mode);
    const { result } = renderHook(() => useTheme({ localStorageKey: 'theme' }));
    expect(result.current.themeMode).toBe(mode);
    expect(result.current.theme).toBe(mode === 'system' ? 'light' : mode);
  });

  test('falls back to system when no mode is stored', () => {
    const { result } = renderHook(() => useTheme({ localStorageKey: 'theme' }));
    expect(result.current.themeMode).toBe('system');
    expect(result.current.theme).toBe('light');
  });

  test('persists mode changes and keeps the setter stable across key changes', () => {
    const { result, rerender } = renderHook(
      ({ localStorageKey }) => useTheme({ localStorageKey }),
      { initialProps: { localStorageKey: 'theme' } },
    );
    const setThemeMode = result.current.setThemeMode;

    act(() => setThemeMode('dark'));
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(result.current.setThemeMode).toBe(setThemeMode);

    rerender({ localStorageKey: 'new-theme' });
    expect(result.current.setThemeMode).toBe(setThemeMode);
    act(() => setThemeMode('light'));
    expect(result.current.themeMode).toBe('light');
    expect(localStorage.getItem('new-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test.each([undefined, ''])('does not access storage for key %s', (localStorageKey) => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useTheme({ localStorageKey }));

    expect(result.current.themeMode).toBe('system');
    act(() => result.current.setThemeMode('dark'));
    expect(result.current.theme).toBe('dark');
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  test('setThemeMode light', () => {
    const { result } = renderHook(useTheme);
    act(() => result.current.setThemeMode('light'));
    expect(result.current.theme).toBe('light');
    expect(result.current.themeMode).toBe('light');
  });

  test('setThemeMode dark', () => {
    const { result } = renderHook(useTheme);
    act(() => result.current.setThemeMode('dark'));
    expect(result.current.theme).toBe('dark');
    expect(result.current.themeMode).toBe('dark');
  });

  test('setThemeMode system', () => {
    const { result } = renderHook(useTheme);
    act(() => result.current.setThemeMode('system'));
    expect(result.current.themeMode).toBe('system');
  });

  test('follows system theme changes and removes the listener on unmount', () => {
    const events = new EventTarget();
    const mediaQuery = {
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(events.addEventListener.bind(events)),
      removeEventListener: vi.fn(events.removeEventListener.bind(events)),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: events.dispatchEvent.bind(events),
    };
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);
    const { result, unmount } = renderHook(useTheme);
    expect(result.current.theme).toBe('dark');

    const lightEvent = new Event('change');
    Object.defineProperty(lightEvent, 'matches', { value: false });
    act(() => events.dispatchEvent(lightEvent));
    expect(result.current.theme).toBe('light');
    const darkEvent = new Event('change');
    Object.defineProperty(darkEvent, 'matches', { value: true });
    act(() => events.dispatchEvent(darkEvent));
    expect(result.current.theme).toBe('dark');

    const listener = mediaQuery.addEventListener.mock.calls[0][1];
    unmount();
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith('change', listener);
  });

  test('works when media query listener APIs are unavailable', () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    for (const method of [
      'addEventListener',
      'removeEventListener',
      'addListener',
      'removeListener',
    ]) {
      Object.defineProperty(mediaQuery, method, { value: undefined });
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);
    const { result, unmount } = renderHook(useTheme);
    expect(result.current.theme).toBe('light');
    expect(() => unmount()).not.toThrow();
  });

  test('falls back to addListener/removeListener when addEventListener is not available (Safari ≤13)', () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener,
        removeListener,
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: vi.fn(),
      })),
    });

    const { unmount } = renderHook(useTheme);
    expect(addListener).toHaveBeenCalledWith(expect.any(Function));

    unmount();
    expect(removeListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
