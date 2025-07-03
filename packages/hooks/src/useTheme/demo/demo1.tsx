/**
 * title: Basic usage
 * description: The "theme" is the system display theme ("light" or "dark"), the "themeMode" can set "theme" to "light" or "dark" or follow the system setting.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 其中 "theme" 为系统当前显示主题（"light" 或 "dark"），"themeMode" 为当前主题设置（"light" 或 "dark" 或 "system"）。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useTheme } from 'ahooks';

export default () => {
  const { theme, themeMode, setThemeMode } = useTheme({
    localStorageKey: 'themeMode',
  });

  return (
    <>
      <div>theme: {theme}</div>
      <div>themeMode: {themeMode}</div>
      <Space style={{ marginTop: 8 }} wrap>
        <Button onClick={() => setThemeMode('dark')}>use dark theme</Button>
        <Button onClick={() => setThemeMode('light')}>use light theme</Button>
        <Button onClick={() => setThemeMode('system')}>follow the system</Button>
      </Space>
    </>
  );
};
