import { useEffect, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type ThemeModeType = `${ThemeMode}`;

export type ThemeType = 'light' | 'dark';

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

function useCurrentTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const init = matchMedia.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
    return init;
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      if (event.matches) {
        setTheme(ThemeMode.DARK);
      } else {
        setTheme(ThemeMode.LIGHT);
      }
    };

    matchMedia.addEventListener('change', onThemeChange);

    return () => {
      matchMedia.removeEventListener('change', onThemeChange);
    };
  }, []);

  return theme;
}

type Options = {
  localStorageKey?: string;
};

export default function useTheme(options: Options = {}) {
  const { localStorageKey } = options;

  const [themeMode, setThemeMode] = useState<ThemeModeType>(() => {
    const preferredThemeMode =
      localStorageKey?.length && (localStorage.getItem(localStorageKey) as ThemeModeType | null);

    return preferredThemeMode ? preferredThemeMode : ThemeMode.SYSTEM;
  });

  const setThemeModeWithLocalStorage = (mode: ThemeModeType) => {
    setThemeMode(mode);

    if (localStorageKey?.length) {
      localStorage.setItem(localStorageKey, mode);
    }
  };

  const currentTheme = useCurrentTheme();
  const theme = themeMode === ThemeMode.SYSTEM ? currentTheme : themeMode;

  return {
    theme,
    themeMode,
    setThemeMode: useMemoizedFn(setThemeModeWithLocalStorage),
  };
}
