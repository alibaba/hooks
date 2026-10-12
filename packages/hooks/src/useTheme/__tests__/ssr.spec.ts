// @vitest-environment node
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useTheme from '..';

afterEach(() => vi.unstubAllGlobals());

describe('useTheme SSR', () => {
  test.each([undefined, '', 'theme'])('renders with storage key %s without localStorage', (key) => {
    vi.stubGlobal('localStorage', undefined);
    function Component() {
      const { theme, themeMode } = useTheme({ localStorageKey: key });
      return createElement('span', null, `${themeMode}:${theme}`);
    }

    expect(renderToString(createElement(Component))).toBe('<span>system:light</span>');
  });

  test('does not access a server-side storage implementation', () => {
    const getItem = vi.fn(() => 'dark');
    const setItem = vi.fn();
    vi.stubGlobal('localStorage', { getItem, setItem });
    let setThemeMode: ReturnType<typeof useTheme>['setThemeMode'] | undefined;
    function Component() {
      const result = useTheme({ localStorageKey: 'theme' });
      setThemeMode = result.setThemeMode;
      return createElement('span', null, result.theme);
    }

    expect(renderToString(createElement(Component))).toBe('<span>light</span>');
    setThemeMode?.('dark');
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });
});
