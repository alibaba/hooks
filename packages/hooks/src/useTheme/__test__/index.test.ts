import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useTheme } from '../index';

describe('useTheme', () => {
  it('init themeMode', () => {
    const {
      result: { current },
    } = renderHook(() => useTheme());
    expect(current.themeMode).toBe('system');
  });

  it('setThemeMode', () => {
    const {
      result: { current },
    } = renderHook(() => useTheme());

    act(() => {
      current.setThemeMode('light');
    });
    expect(current.theme).toBe('light');
    expect(current.themeMode).toBe('light');

    act(() => {
      current.setThemeMode('dark');
    });
    expect(current.theme).toBe('dark');
    expect(current.themeMode).toBe('dark');

    act(() => {
      current.setThemeMode('system');
    });
    expect(current.themeMode).toBe('system');
  });
});
