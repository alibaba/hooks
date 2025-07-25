import { act, renderHook } from '@testing-library/react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import useTheme from '../index';

describe('useTheme', () => {
  beforeAll(() => {
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
});
