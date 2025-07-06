/**
 * title: Basic usage
 * desc: The 'theme' is the system display theme ("light" or "dark"), the 'themeMode' can set 'theme' to "light" or "dark" or follow the system setting.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 'theme' 为系统当前显示主题（"light" 或 "dark"），'themeMode' 为当前主题设置（"light" 或 "dark" 或 "system"）。
 */

import { useTheme } from 'ahooks';
import React from 'react';

export default () => {
  const { theme, themeMode, setThemeMode } = useTheme({
    localStorageKey: 'themeMode',
  });

  return (
    <>
      <div>theme: {theme}</div>
      <div>themeMode: {themeMode}</div>
      <button
        type="button"
        onClick={() => {
          setThemeMode('dark');
        }}
      >
        use dark theme
      </button>
      <button
        type="button"
        onClick={() => {
          setThemeMode('light');
        }}
      >
        use light theme
      </button>
      <button
        type="button"
        onClick={() => {
          setThemeMode('system');
        }}
      >
        follow the system
      </button>
    </>
  );
};
