import { useEffect, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import isBrowser from '../utils/isBrowser';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type ThemeModeType = `${ThemeMode}`;

export type ThemeType = 'light' | 'dark';

const useCurrentTheme = () => {
  const matchMedia = isBrowser ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (isBrowser) {
      return matchMedia?.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
    } else {
      return ThemeMode.LIGHT;
    }
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      if (event.matches) {
        setTheme(ThemeMode.DARK);
      } else {
        setTheme(ThemeMode.LIGHT);
      }
    };

    if (matchMedia?.addEventListener) {
      matchMedia.addEventListener('change', onThemeChange);
    } else if (matchMedia?.addListener) {
      matchMedia.addListener(onThemeChange);
    }

    return () => {
      if (matchMedia?.removeEventListener) {
        matchMedia.removeEventListener('change', onThemeChange);
      } else if (matchMedia?.removeListener) {
        matchMedia.removeListener(onThemeChange);
      }
    };
  }, []);

  return theme;
};

type Options = {
  localStorageKey?: string;
};

export default function useTheme(options: Options = {}) {
  const { localStorageKey } = options;

  const [themeMode, setThemeMode] = useState<ThemeModeType>(() => {
    if (isBrowser && localStorageKey) {
      try {
        return (localStorage.getItem(localStorageKey) as ThemeModeType | null) || ThemeMode.SYSTEM;
      } catch {
        // The browser can deny storage access even when a window is available.
      }
    }
    return ThemeMode.SYSTEM;
  });

  const setThemeModeWithLocalStorage = (mode: ThemeModeType) => {
    setThemeMode(mode);

    if (isBrowser && localStorageKey?.length) {
      try {
        localStorage.setItem(localStorageKey, mode);
      } catch {
        // The selected mode still applies to this instance if persistence fails.
      }
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
