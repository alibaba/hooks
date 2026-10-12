import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useTheme from '..';

describe('useTheme browser storage', () => {
  const getItem = vi.fn<Storage['getItem']>();
  const setItem = vi.fn<Storage['setItem']>();

  beforeEach(() => {
    getItem.mockReset().mockReturnValue(null);
    setItem.mockReset();
    vi.stubGlobal('localStorage', { getItem, setItem });
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  test.each(['light', 'dark', 'system'] as const)('reads the stored %s mode', (mode) => {
    getItem.mockReturnValue(mode);
    const hook = renderHook(() => useTheme({ localStorageKey: 'theme' }));
    expect(getItem).toHaveBeenCalledWith('theme');
    expect(hook.result.current.themeMode).toBe(mode);
    expect(hook.result.current.theme).toBe(mode === 'dark' ? 'dark' : 'light');
    hook.unmount();
  });

  test('uses system mode when the storage key is absent from storage', () => {
    const hook = renderHook(() => useTheme({ localStorageKey: 'theme' }));
    expect(hook.result.current.themeMode).toBe('system');
    hook.unmount();
  });

  test('persists a selected mode and retains a stable setter', () => {
    const hook = renderHook(() => useTheme({ localStorageKey: 'theme' }));
    const setter = hook.result.current.setThemeMode;
    act(() => setter('dark'));
    expect(hook.result.current.theme).toBe('dark');
    expect(setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(hook.result.current.setThemeMode).toBe(setter);
    hook.unmount();
  });

  test.each([undefined, ''])('does not access storage with key %s', (key) => {
    const hook = renderHook(() => useTheme({ localStorageKey: key }));
    act(() => hook.result.current.setThemeMode('dark'));
    expect(hook.result.current.theme).toBe('dark');
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    hook.unmount();
  });

  test.each(['modern', 'legacy'] as const)(
    'tracks system theme changes with %s listeners',
    (api) => {
      let listener: ((event: { matches: boolean }) => void) | undefined;
      const addListener = vi.fn((callback: (event: { matches: boolean }) => void) => {
        listener = callback;
      });
      const removeListener = vi.fn();
      vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({
          matches: true,
          ...(api === 'modern'
            ? {
                addEventListener: (
                  _type: string,
                  callback: (event: { matches: boolean }) => void,
                ) => addListener(callback),
                removeEventListener: removeListener,
              }
            : { addListener, removeListener }),
        })),
      );
      const hook = renderHook(useTheme);
      expect(hook.result.current.theme).toBe('dark');
      act(() => listener?.({ matches: false }));
      expect(hook.result.current.theme).toBe('light');
      act(() => listener?.({ matches: true }));
      expect(hook.result.current.theme).toBe('dark');
      hook.unmount();
      expect(removeListener).toHaveBeenCalled();
    },
  );

  test('renders when the media query has no listener API', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    );
    const hook = renderHook(useTheme);
    expect(hook.result.current.theme).toBe('light');
    hook.unmount();
  });
});
