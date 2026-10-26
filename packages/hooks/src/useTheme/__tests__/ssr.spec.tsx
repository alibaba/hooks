// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useTheme from '../index';

function App() {
  const { theme, themeMode } = useTheme({ localStorageKey: 'theme' });
  return <span>{`${themeMode}:${theme}`}</span>;
}

describe('useTheme on the server', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('ignores the storage key when browser storage is unavailable', () => {
    vi.stubGlobal('localStorage', undefined);
    expect(renderToString(<App />)).toBe('<span>system:light</span>');
  });

  test('ignores storage provided by the server runtime', () => {
    const storage = { getItem: vi.fn(() => 'dark'), setItem: vi.fn() };
    vi.stubGlobal('localStorage', storage);

    expect(renderToString(<App />)).toBe('<span>system:light</span>');
    expect(storage.getItem).not.toHaveBeenCalled();
  });

  test.each([false, true])('does not write to server storage (available: %s)', (available) => {
    const storage = { getItem: vi.fn(), setItem: vi.fn() };
    vi.stubGlobal('localStorage', available ? storage : undefined);
    let setThemeMode: ReturnType<typeof useTheme>['setThemeMode'] | undefined;

    function CaptureSetter() {
      setThemeMode = useTheme({ localStorageKey: 'theme' }).setThemeMode;
      return null;
    }

    renderToString(<CaptureSetter />);
    if (!setThemeMode) {
      throw new Error('The server render did not expose a theme setter');
    }
    const updateTheme = setThemeMode;
    expect(() => updateTheme('dark')).not.toThrow();
    expect(storage.getItem).not.toHaveBeenCalled();
    expect(storage.setItem).not.toHaveBeenCalled();
  });
});
