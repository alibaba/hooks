// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { describe, expect, test } from 'vitest';
import useTheme from '../index';

function App() {
  const { theme, themeMode } = useTheme({ localStorageKey: 'theme' });
  return <span>{`${themeMode}:${theme}`}</span>;
}

describe('useTheme on the server', () => {
  test('ignores the storage key when browser storage is unavailable', () => {
    expect(renderToString(<App />)).toBe('<span>system:light</span>');
  });
});
