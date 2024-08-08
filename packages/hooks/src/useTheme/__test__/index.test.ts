import { act, renderHook } from '@testing-library/react';
import useTheme from '../index';

describe('useTheme', () => {
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
